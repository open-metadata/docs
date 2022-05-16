import { join, basename } from "path";
import { H1, H2, H3 } from "../blocks/headers";
import Image from "../blocks/image";
import fs from "fs";
import dynamic from 'next/dynamic'


const MetadataIngestionServiceDev = ({connector, service, goal}) => {

    // Prepare connector URL
    const urlRoot = "https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/entity/services/connections/"
    let connectorJsonUrl = urlRoot + service + "/" + connector.charAt(0).toLowerCase() + connector.slice(1) + "Connection.json"

    // Read YAML config
    // import YAML from join("/ingestion", "connectors", connector.toLowerCase() + ".yaml");
    const path = "/openmetadata/ingestion/" + connector.toLowerCase() + ".yaml";
    const YAML = dynamic(() => import(path));


    //const yamlConfig = fs.readFileSync(
    //  join("/ingestion", "connectors", connector.toLowerCase() + ".yaml"),
    //  "utf8"
    //);



    return (
        <section>
            <H2>Metadata Ingestion</H2>
            <p>
                All connectors are defined as JSON Schemas. <a href={connectorJsonUrl}>Here</a> you can find the structure to create a connection to {connector}.
            </p>
            <p>
                In order to create and run a Metadata Ingestion workflow, we will follow the steps to create a YAML configuration able to connect to the source,
                process the Entities if needed, and reach the OpenMetadata server.
            </p>
            <p>
                The workflow is modeled around the following <a href="https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/metadataIngestion/workflow.json">JSON Schema</a>.
            </p>

            <H3>1. Define the YAML Config</H3>
            <p>
                This is a sample config for {connector}:
            </p>
            <code className="YAML">{YAML.text} hello</code>

        </section>
    );
};

export default MetadataIngestionServiceDev;
