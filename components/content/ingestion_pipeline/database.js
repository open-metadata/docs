import { H3 } from "../../blocks/headers";
import Image from "../../blocks/image";

const DatabaseIngestionConfig = ({ connector }) => {
  return (
    <section>
      <H3>6. Configure Metadata Ingestion</H3>
      <p>
        In this step we will configure the metadata ingestion pipeline, 
        Please follow the instructions below 
      </p>
      <Image
        src="/images/openmetadata/connectors/configure-metadata-ingestion-database.png"
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
          <b>Database Filter Pattern (Optional): </b> Use to database filter patterns to control
           whether or not to include database as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include databases by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all databases 
              with names matching one or more of the supplied regular expressions. All other 
              databases will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude databases by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all databases 
              with names matching one or more of the supplied regular expressions. All other 
              databases will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Schema Filter Pattern (Optional): </b> Use to schema filter patterns to control
           whether or not to include schemas as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include schemas by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all schemas 
              with names matching one or more of the supplied regular expressions. All other 
              schemas will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude schemas by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all schemas 
              with names matching one or more of the supplied regular expressions. All other 
              schemas will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Table Filter Pattern (Optional): </b> Use to table filter patterns to control 
          whether or not to include tables as part of metadata ingestion.
          <ul>
            <li>
              <b>Include: </b> Explicitly include tables by adding a list of comma-separated 
              regular expressions to the Include field. OpenMetadata will include all tables 
              with names matching one or more of the supplied regular expressions. All other 
              tables will be excluded.
            </li>
            <li>
              <b>Exclude: </b> Explicitly exclude tables by adding a list of comma-separated 
              regular expressions to the Exclude field. OpenMetadata will exclude all 
              tables with names matching one or more of the supplied regular expressions. 
              All other tables will be included.
            </li>
          </ul>
        </li>
        <li>
          <b>Include views (toggle): </b> Set the Include views toggle to control whether 
          or not to include views as part of metadata ingestion.
        </li>
        <li>
          <b>Include tags(toggle): </b> Set the Include tags toggle to control whether or 
          not to include tags as part of metadata ingestion.
        </li>
        <li>
          <b>Enable Debug Log(toggle): </b> Set the Enable Debug Log toggle to set the 
          default log level to debug, these logs can be viewed later in Airflow.
        </li>
        <li>
          <b>Mark Deleted Tables (toggle): </b> Set the Mark Deleted Tables toggle to 
          flag tables as soft-deleted if they are not present anymore in the source system.
        </li>
        <li>
          <b>Mark Deleted Tables from Filter Only (toggle): </b> Set the Mark Deleted Tables from 
          Filter Only toggle to flag tables as soft-deleted if they are not present anymore within 
          the filtered schema or database only. This flag is useful when you have more than one 
          ingestion pipelines. For example if you have a schema 
        </li>
      </ul>
    </section>
  );
};

export default DatabaseIngestionConfig;
