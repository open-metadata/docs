import { H3 } from "../../blocks/headers";
import Image from "../../blocks/image";

const DashboardIngestionConfig = ({ connector }) => {
  return (
    <section>
      <H3>6. Configure Metadata Ingestion</H3>
      <p>
        In this step we will configure the metadata ingestion pipeline, 
        Please follow the instructions below 
      </p>
      <Image
        src="/images/openmetadata/connectors/configure-metadata-ingestion-dashboard.png"
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
          <b>Dashboard Filter Pattern (Optional): </b> Use to dashboard filter patterns to control
           whether or not to include dashboard as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include dashboards by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all dashboards 
              with names matching one or more of the supplied regular expressions. All other 
              dashboards will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude dashboards by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all dashboards 
              with names matching one or more of the supplied regular expressions. All other 
              dashboards will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Chart Pattern (Optional): </b> Use to chart filter patterns to control
           whether or not to include charts as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include charts by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all charts 
              with names matching one or more of the supplied regular expressions. All other 
              charts will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude charts by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all charts 
              with names matching one or more of the supplied regular expressions. All other 
              charts will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Database Service Name (Optional): </b> Enter the name of Database Service which 
          is already ingested in the openmetadata to create lineage between dashboards and 
          database tables.
        </li>
        <li>
          <b>Enable Debug Log(toggle): </b> Set the Enable Debug Log toggle to set the 
          default log level to debug, these logs can be viewed later in Airflow.
        </li>
      </ul>
    </section>
  );
};

export default DashboardIngestionConfig;
