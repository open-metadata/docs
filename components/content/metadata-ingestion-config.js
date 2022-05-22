import { useEffect, useState } from 'react';
import { H2, H3, H4 } from '../blocks/headers';
import YAML from 'yaml';
import yaml from "js-yaml";
import CodeTile from "../blocks/codeTile";
import Code from "../blocks/code";

const MetadataIngestionConfig = ({ service, connector, goal, hasUsage }) => {

   // Prepare connector URL
     const urlRoot =
       'https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/entity/services/connections/';
     const connectorJsonUrl =
       urlRoot +
       service +
       '/' +
       connector.charAt(0).toLowerCase() +
       connector.slice(1) +
       'Connection.json';

     const sourceConfigUrl = `https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/metadataIngestion/${service}ServiceMetadataPipeline.json`
     const usageSourceConfigUrl = `https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/metadataIngestion/${service}ServiceQueryUsagePipeline.json`
     const profilerSourceConfigUrl = `https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/metadataIngestion/databaseServiceProfilerPipeline.json`

    const [usageYamlConfig, setUsageYaml] = useState();
    const [profilerYamlConfig, setProfilerYaml] = useState();

    useEffect(() => {
        const readYaml = async () => {
          if (hasUsage) {
            const usage = (await import(
              `/public/ingestion/connectors/${connector.toLowerCase()}/usage.yaml`
            )).default;
            const usageYamlData = yaml.safeDump(yaml.safeLoad(JSON.stringify(usage)));
            setUsageYaml(usageYamlData);
          }

          const profiler = (await import(
            `/public/ingestion/connectors/${connector.toLowerCase()}/profiler.yaml`
          )).default;
          const profilerYamlData = yaml.safeDump(yaml.safeLoad(JSON.stringify(profiler)));
          setProfilerYaml(profilerYamlData);
        };
        readYaml();
      }, [connector, hasUsage]);

    let block;
    let prepareIngestion;
    let prepareUsage = null;
    let prepareUsageIngestion = null;
    let prepareProfiler;
    let prepareProfilerIngestion;

    const sourceConfig = (
        <section>
        <H4>Source Configuration - Source Config</H4>
        <p>
        The <code>sourceConfig</code> is defined{' '}
        <a href={sourceConfigUrl}>here</a>:
        </p>
        <ul>
        <li><code>enableDataProfiler</code>: true or false, to run the profiler (not the tests) during the metadata ingestion.</li>
        <li><code>markDeletedTables</code>: To flag tables as soft-deleted if they are not present anymore in the source system.</li>
        <li><code>includeTables</code>: true or false, to ingest table data. Default is true.</li>
        <li><code>includeViews</code>: true or false, to ingest views definitions.</li>
        <li><code>generateSampleData</code>: To ingest sample data based on sampleDataQuery.</li>
        <li><code>sampleDataQuery</code>: Defaults to select * from {}.{} limit 50.</li>
        <li>
        <code>schemaFilterPattern</code> and <code>tableFilternPattern</code>: Note that the schemaFilterPattern and tableFilterPattern both support regex as include or exclude. E.g.,

        <Code
            language="YAML"
            code={
`tableFilterPattern:
  includes:
    - users
    - type_test
`}
        />

        </li>
        </ul>
        </section>
    )

    const sinkConfig = (
        <section>
        <H4>Sink Configuration</H4>
        <p>
        To send the metadata to OpenMetadata, it needs to be specified as <code>type: metadata-rest</code>
        </p>
        </section>

    )

    const workflowConfig = (
        <section>
        <H4>Workflow Configuration</H4>
        <p>
        The main property here is the <code>openMetadataServerConfig</code>, where you can define the host{' '}
        and security provider of your OpenMetadata installation.
        </p>
        <p>
        For a simple, local installation using our docker containers, this looks like:
        </p>
        <Code
            language="yaml"
            code={
`workflowConfig:
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: no-auth
`}
        />

        <p>
        We support different security providers. You can find their definitions <a href="https://github.com/open-metadata/OpenMetadata/tree/main/catalog-rest-service/src/main/resources/json/schema/security/client">here</a>.{' '}
        An example of an Auth0 configuration would be the following:
        </p>
        <Code
            language="yaml"
            code={
`workflowConfig:
  openMetadataServerConfig:
    hostPort: http://localhost:8585/api
    authProvider: auth0
    securityConfig:
      clientId: <client ID>
      secretKey: <secret key>
      domain: <domain>
`}
        />
        </section>
    )

    if (goal == "Airflow") {
        prepareIngestion = (
            <section>
            <H3>2. Prepare the Ingestion DAG</H3>
            <p>Create a Python file in your Airflow DAGs directory with the following contents:</p>
            <Code
            language="python"
            code={
`import pathlib
import yaml
from datetime import timedelta
from airflow import DAG

try:
    from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
    from airflow.operators.python_operator import PythonOperator

from metadata.config.common import load_config_file
from metadata.ingestion.api.workflow import Workflow
from airflow.utils.dates import days_ago

default_args = {
    "owner": "user_name",
    "email": ["username@org.com"],
    "email_on_failure": False,
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "execution_timeout": timedelta(minutes=60)
}

config = """
<your YAML configuration>
"""

def metadata_ingestion_workflow():
    workflow_config = yaml.safe_load(config)
    workflow = Workflow.create(workflow_config)
    workflow.execute()
    workflow.raise_from_status()
    workflow.print_status()
    workflow.stop()

with DAG(
    "sample_data",
    default_args=default_args,
    description="An example DAG which runs a OpenMetadata ingestion workflow",
    start_date=days_ago(1),
    is_paused_upon_creation=False,
    schedule_interval='*/5 * * * *',
    catchup=False,
) as dag:
    ingest_task = PythonOperator(
        task_id="ingest_using_recipe",
        python_callable=metadata_ingestion_workflow,
    )
`}
        />
            <p>
            Note that from connector to connector, this recipe will always be the same. By updating the YAML configuration,{' '}
            you will be able to extract metadata from different sources.
            </p>
            </section>
        )

    }

    if (goal == "CLI") {
        prepareIngestion = (
            <section>
            <H3>2. Run with the CLI</H3>
            <p>
            First, we will need to save the YAML file. Afterward, and with all requirements installed, we can run:
            </p>
            <Code
                language="bash"
                code={`metadata ingest -c <path-to-yaml>`}
            />
            <p>
            Note that from connector to connector, this recipe will always be the same. By updating the YAML configuration,{' '}
            you will be able to extract metadata from different sources.
            </p>
            </section>
        )

    }

    if (hasUsage) {

        if (goal == "Airflow") {
            prepareUsageIngestion = (
                <section>
                <H3>2. Prepare the Ingestion DAG</H3>
                <p>
                There is an extra requirement to run the Usage pipelines. You will need to install:
                </p>
                <Code
                    language="bash"
                    code={`pip3 install --upgrade 'openmetadata-ingestion[${connector.toLowerCase()}-usage]'`}
                />
                <p>
                For the usage workflow creation, the Airflow file will look the same as for the metadata ingestion.{' '}
                Updating the YAML configuration will be enough.
                </p>
                </section>
            )
        }
        if (goal == "CLI") {
            prepareUsageIngestion = (
                <section>
                <H3>2. Run with the CLI</H3>
                <p>
                There is an extra requirement to run the Usage pipelines. You will need to install:
                </p>
                <Code
                    language="bash"
                    code={`pip3 install --upgrade 'openmetadata-ingestion[${connector.toLowerCase()}-usage]'`}
                />
                <p>
                After saving the YAML config, we will run the command the same way we did for the metadata ingestion:
                </p>
                <Code
                    language="bash"
                    code={`metadata ingest -c <path-to-yaml>`}
                />
                </section>
            )
        }
        prepareUsage = (
            <section>
            <H2>Query Usage and Lineage Ingestion</H2>
            <p>
            To ingest the Query Usage and Lineage information, the serviceConnection configuration will remain the same.{' '}
            However, the <code>sourceConfig</code> is now modeled after{' '}
            <a href={usageSourceConfigUrl}>this</a> JSON Schema.
            </p>
            <H3>1. Define the YAML Config</H3>
            <p>This is a sample config for {connector} Usage:</p>
            <Code
                language="yaml"
                code={usageYamlConfig}
            />

            <H4>Source Configuration - Service Connection</H4>
            <p>
            You can find all the definitions and types for the serviceConnection <a href={connectorJsonUrl}>here</a>.{' '}
            They are the same as metadata ingestion.
            </p>
            <H4>Source Configuration - Source Config</H4>
            <p>
            The <code>sourceConfig</code> is defined <a href={usageSourceConfigUrl}>here</a>.
            <ul>
                <li><code>queryLogDuration</code>: Configuration to tune how far we want to look back in query logs to process usage data.</li>
                <li><code>resultLimit</code>: Configuration to set the limit for query logs</li>
            </ul>
            </p>
            <H4>Processor, Stage and Bulk Sink</H4>
            <p>To specify where the staging files will be located.</p>
            <H4>Workflow Configuration</H4>
            <p>
            The same as the metadata ingestion.
            </p>
            {prepareUsageIngestion}
            </section>
        )
    }

    prepareProfiler = (
        <section>
        <H2>Data Profiler and Quality Tests</H2>
        <p>
        The Data Profiler workflow will be using the <code>orm-profiler</code> processor.
        While the <code>serviceConnection</code> will still be the same to reach the source system,
        the <code>sourceConfig</code> will be updated from previous configurations.
        </p>
        <H3>1. Define the YAML Config</H3>
        <p>This is a sample config for the profiler:</p>
        <Code
            language="yaml"
            code={profilerYamlConfig}
        />
        <H4>Source Configuration</H4>
        <ul>
            <li>You can find all the definitions and types for the <code>serviceConnection</code> <a href={connectorJsonUrl}>here</a>.</li>
            <li>The <code>sourceConfig</code> is defined <a href={profilerSourceConfigUrl}>here</a>.</li>
        </ul>
        <p>
        Note that the <code>fqnFilterPattern</code> supports regex as includes or excludes. E.g.,
        </p>
        <Code
            language="yaml"
            code={`fqnFilterPattern:
  includes:
    - service.database.schema.*`}
        />
        <H4>Processor</H4>
        <p>
        Choose the <code>orm-profiler</code>. Its config can also be updated to define tests from the YAML itself instead of the UI:
        <Code
            language="yaml"
            code={`processor:
  type: orm-profiler
  config:
    test_suite:
      name: <Test Suite name>
      tests:
        - table: <Table FQN>
          table_tests:
            - testCase:
                config:
                  value: 100
                tableTestType: tableRowCountToEqual
          column_tests:
            - columnName: <Column Name>
              testCase:
                config:
                  minValue: 0
                  maxValue: 99
                columnTestType: columnValuesToBeBetween
`}
        />
        <code>tests</code> is a list of test definitions that will be applied to table, informed by its FQN.{' '}
        For each table, one can then define a list of <code>table_tests</code> and <code>column_tests</code>.{' '}
        Review the supported tests and their definitions to learn how to configure the different cases here.  // TODO: Link to tests
        </p>
        <H4>Workflow Configuration</H4>
        <p>
        The same as the metadata ingestion.
        </p>
        </section>
    )

    if (goal == "Airflow") {
        prepareProfilerIngestion = (
            <section>
            <H2>2. Prepare the Ingestion DAG</H2>
            <p>
            Here, we follow a similar approach as with the metadata and usage pipelines, although we will use a different Workflow class:
            </p>
            <Code
                language="python"
                code={`import yaml
from datetime import timedelta

from airflow import DAG

try:
   from airflow.operators.python import PythonOperator
except ModuleNotFoundError:
   from airflow.operators.python_operator import PythonOperator

from airflow.utils.dates import days_ago

from metadata.orm_profiler.api.workflow import ProfilerWorkflow


default_args = {
   "owner": "user_name",
   "email_on_failure": False,
   "retries": 3,
   "retry_delay": timedelta(seconds=10),
   "execution_timeout": timedelta(minutes=60),
}

config = """
<your YAML configuration>
"""

def metadata_ingestion_workflow():
   workflow_config = yaml.safe_load(config)
   workflow = ProfilerWorkflow.create(workflow_config)
   workflow.execute()
   workflow.raise_from_status()
   workflow.print_status()
   workflow.stop()

with DAG(
   "profiler_example",
   default_args=default_args,
   description="An example DAG which runs a OpenMetadata ingestion workflow",
   start_date=days_ago(1),
   is_paused_upon_creation=False,
   catchup=False,
) as dag:
   ingest_task = PythonOperator(
       task_id="profile_and_test_using_recipe",
       python_callable=metadata_ingestion_workflow,
   )
                `}
            />
            </section>
        )
    }

    if (goal == "CLI") {
        prepareProfilerIngestion = (
            <section>
            <H3>2. Run with the CLI</H3>
            <p>
            After saving the YAML config, we will run the command the same way we did for the metadata ingestion:
            </p>
            <Code
                language="bash"
                code={`metadata profile -c <path-to-yaml>`}
            />
            <p>
            Note how instead of running <code>ingest</code>, we are using the <code>profile</code> command to select the Profiler workflow.
            </p>
            </section>
        )
    }




    block = (
        <section>
        {sourceConfig}
        {sinkConfig}
        {workflowConfig}
        {prepareIngestion}
        {prepareUsage}
        {prepareProfiler}
        {prepareProfilerIngestion}
        </section>
    )

    return block
};

export default MetadataIngestionConfig;
