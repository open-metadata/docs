import { useEffect } from 'react';
import { join, basename } from "path";
import { H1, H2, H3 } from "../blocks/headers";
import Image from "../blocks/image";
import dynamic from 'next/dynamic'
import anotherYaml from "/public/ingestion/connectors/bigquery.yaml";


// async function loadYaml(connector) {
//     const YAML = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml")
//     return YAML
// }
//const loadYaml = async (connector) => {
//  const res = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml");
//  console.log("I AM INSIDE THE FUNCTION")
//  console.log(res)
//}

const MetadataIngestionServiceDev = ({connector, service, goal}) => {

    const yaml = require('js-yaml');

    // Prepare connector URL
    const urlRoot = "https://github.com/open-metadata/OpenMetadata/blob/main/catalog-rest-service/src/main/resources/json/schema/entity/services/connections/"
    let connectorJsonUrl = urlRoot + service + "/" + connector.charAt(0).toLowerCase() + connector.slice(1) + "Connection.json"

    // Read YAML config
    // https://github.com/vercel/next.js/issues/3775
    // const YAML = dynamic(
       // import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml")
        // .then((result) => {
        //     return result.loaded
        // })

        // .then((result) => result.default)

        // .then((c) => {
        //     console.log('Component loaded');
        //     return c;
        // }).catch(err => console.log(err)),
        // { ssr: false }
    // );
    // const YAML = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml")
    // const YAML = (async () => await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml"))();
    // const YAML = loadYaml(connector)

    // const request = async () => {
    //     const response = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml");
    //     console.log(response);
    //     return response;
    // }
    // const YAML = await loadYaml(connector)
    // const YAML = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml");

    /*
    useEffect(() => {
      return async () => {
        const YAML = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml");
      }
    }, []);

    useEffect(() => {(
        async function loadData() {
        const YAML = await import("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml");})();
    })
    */

    console.log("----")
    // console.log(anotherYaml)


    console.log(YAML)
    console.log("/public/ingestion/connectors/" + connector.toLowerCase() + ".yaml")
    // console.log(typeof(YAML))
    // console.log(YAML.loaded)

    // const yamlConfig = fs.readFileSync(
    //   join("/public", "ingestion", "connectors", connector.toLowerCase() + ".yaml"),
    //   "utf8"
    // );

    // console.log(YAML.toString())
    // console.log(YAML)
    console.log("----")

    // DO NOT DELETE ME
    // let yamlStr = yaml.safeDump(YAML);
    // console.log(yamlStr);



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
            <code className="YAML"> hello</code>

        </section>
    );
};

export default MetadataIngestionServiceDev;
