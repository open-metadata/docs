import TileContainer from "../layouts/tileContainer";
import Tile from "../blocks/tile";
import { H1, H2, H3 } from "../blocks/headers";

const ConnectorIntro = ({connector, hasUsage, goal}) => {

    let toc;
    let block;
    let from;
    let title;

    if (goal == "UI" || goal == null) {
        title = connector
        from = "from the OpenMetadata UI"
    }
    if (goal == "Airflow") {
        title = "Run " + connector + " using Airflow SDK"
        from = "using your own Airflow instance"
    }
    if (goal == "CLI") {
        title = "Run " + connector + " using the metadata CLI"
        from = "using the metadata CLI"
    }

    const intro = (
        <section>
            <H1>{title}</H1>
            <p>In this section, we provide guides and references to use the {connector} connector.</p>
            <br/>
        </section>
    )

    const developers = (
        <section>
          <p>
            If you don't want to use the OpenMetadata Ingestion container to configure the workflows via the UI,
            then you can check the following docs to connect using Airflow SDK or with the CLI.
          </p>

         <TileContainer>
             <Tile
                 icon="manage_accounts"
                 title="Ingest with Airflow"
                 text="Configure the ingestion using Airflow SDK"
                 link={"/metadata-ui/ingestion/workflows/metadata/connectors/database/" + connector.toLowerCase() + "/airflow"}
                 size="half"
             />
             <Tile
                 icon="manage_accounts"
                 title="Ingest with the CLI"
                 text="Run a one-time ingestion using the metadata CLI"
                 link={"/metadata-ui/ingestion/workflows/metadata/connectors/database/" + connector.toLowerCase() + "/cli"}
                 size="half"
             />
         </TileContainer>
        </section>
    )

    if (hasUsage){
        toc = (
                <section>
                <p>Configure and schedule {connector} metadata, usage and profiler workflows {from}:</p>
                <ul>
                    <li> <a href="#requirements">Requirements</a> </li>
                    <li><a href="#metadata-ingestion">Metadata Ingestion</a> </li>
                    <li><a href="#query-usage-and-lineage-ingestion">Query Usage and Lineage Ingestion</a> </li>
                    <li><a href="#data-profiler-and-quality-tests">Data Profiler and Quality Tests</a> </li>
                    <li><a href="#dbt-integration">DBT Integration</a> </li>
                </ul>
                </section>
            );
    } else {
        toc = (
              <section>
              <p>Configure and schedule {connector} metadata and profiler workflows from the OpenMetadata UI:</p>
              <ul>
                  <li> <a href="#requirements">Requirements</a> </li>
                  <li><a href="#metadata-ingestion">Metadata Ingestion</a> </li>
                  <li><a href="#data-profiler-and-quality-tests">Data Profiler and Quality Tests</a> </li>
                  <li><a href="#dbt-integration">DBT Integration</a> </li>
              </ul>
              </section>
            );
    }

    if (goal == "UI" || goal == null) {
        block = (
                <section>
                {intro}
                {toc}
                {developers}
                </section>
            )
    }

    if (goal == "Airflow" || goal == "CLI") {
        block = (
            <section>
            {intro}
            {toc}
            </section>
        )
    }

    return block;
};

export default ConnectorIntro;
