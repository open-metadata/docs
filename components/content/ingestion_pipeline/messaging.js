import { H3 } from "../../blocks/headers";
import Image from "../../blocks/image";

const MessaginIngestionConfig = ({ connector }) => {
  return (
    <section>
      <H3>6. Configure Metadata Ingestion</H3>
      <p>
        In this step we will configure the metadata ingestion pipeline, 
        Please follow the instructions below 
      </p>
      <Image
        src="/images/openmetadata/connectors/configure-metadata-ingestion-messaging.png"
        alt="Configure Metadata Ingestion"
        caption="Configure Metadata Ingestion Page"
      />
      <h4 className="mt-1">Metadata Ingestion Options</h4>
      <ul>
        <li>
          <b>Name: </b> This field refers to the name of ingestion pipeline,
          you can customize the name or use the generated name.
        </li>
        <li>
          <b>Topic Filter Pattern (Optional): </b> Use to topic filter patterns to control
           whether or not to include dashboard as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include topics by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all topics 
              with names matching one or more of the supplied regular expressions. All other 
              topics will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude topics by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all topics 
              with names matching one or more of the supplied regular expressions. All other 
              topics will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Ingsest Sample Data(toggle): </b> Set the Ingest sample data toggle to the on 
          position to control whether or not to generate sample data to include in topics
          in the OpenMetadata user interface.
        </li>
        <li>
          <b>Enable Debug Log(toggle): </b> Set the Enable Debug Log toggle to set the 
          default log level to debug, these logs can be viewed later in Airflow.
        </li>
      </ul>
    </section>
  );
};

export default MessaginIngestionConfig;
