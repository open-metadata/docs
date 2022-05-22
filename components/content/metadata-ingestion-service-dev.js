import { useEffect, useState } from 'react';
import { H2, H3 } from '../blocks/headers';
import yaml from "js-yaml";
import Code from "../blocks/code";


const MetadataIngestionServiceDev = ({ connector, service, goal }) => {

  const [yamlConfig, setYaml] = useState();
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

  useEffect(() => {
    const readYaml = async () => {
      const data = (await import(
        `/public/ingestion/connectors/${connector.toLowerCase()}/ingestion.yaml`
      )).default;

      const yamlData = yaml.safeDump(yaml.safeLoad(JSON.stringify(data)));
      setYaml(yamlData);
    };
    readYaml();
  }, [connector]);

  return (
    <section>
      <H2>Metadata Ingestion</H2>
      <p>
        All connectors are defined as JSON Schemas.{' '}
        <a href={connectorJsonUrl}>Here</a> you can find the structure to create
        a connection to {connector}.
      </p>
      <p>
        In order to create and run a Metadata Ingestion workflow, we will follow
        the steps to create a YAML configuration able to connect to the source,
        process the Entities if needed, and reach the OpenMetadata server.
      </p>
      <p>
        The workflow is modeled around the following{' '}
        <a href="https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/metadataIngestion/workflow.json">
          JSON Schema
        </a>
        .
      </p>

      <H3>1. Define the YAML Config</H3>
      <p>This is a sample config for {connector}:</p>

      <Code
          language="yaml"
          code={yamlConfig}
      />

    </section>
  );
};

export default MetadataIngestionServiceDev;