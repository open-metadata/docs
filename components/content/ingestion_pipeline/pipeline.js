import { H3 } from "../../blocks/headers";
import Image from "../../blocks/image";

const PipelineIngestionConfig = ({ connector }) => {
  return (
    <section>
      <H3>6. Configure Metadata Ingestion</H3>
      <p>
        In this step we will configure the metadata ingestion pipeline, 
        Please follow the instructions below 
      </p>
      <Image
        src="/images/openmetadata/connectors/configure-metadata-ingestion-pipeline.png"
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
          <b>Pipeline Filter Pattern (Optional): </b> Use to pipleine filter patterns to control
           whether or not to include pipleine as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include pipleine by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all pipleine 
              with names matching one or more of the supplied regular expressions. All other 
              schemas will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude pipleine by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all pipleine 
              with names matching one or more of the supplied regular expressions. All other 
              schemas will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Include lineage (toggle): </b> Set the Include lineage toggle to control whether 
          or not to include lineage between piplines and datasources as part of metadata ingestion.
        </li>
        <li>
          <b>Enable Debug Log(toggle): </b> Set the Enable Debug Log toggle to set the 
          default log level to debug, these logs can be viewed later in Airflow.
        </li>
      </ul>
    </section>
  );
};

export default PipelineIngestionConfig;
