import { H3 } from "../../blocks/headers";
import Image from "../../blocks/image";

const MlModelIngestionConfig = ({ connector }) => {
  return (
    <section>
      <H3>6. Configure Metadata Ingestion</H3>
      <p>
        In this step we will configure the metadata ingestion pipeline, 
        Please follow the instructions below 
      </p>
      <Image
        src="/images/openmetadata/connectors/configure-metadata-ingestion-ml-model.png"
        alt="Configure Metadata Ingestion"
        caption="Configure Metadata Ingestion Page"
      />
      <h4 className="mt-1">Metadata Ingestion Options</h4>
      <ul>
        <li>
          <b>Name: </b> This field refers to the name of ingestion pipeline,
          you can customize the name or use the generated name.
        </li>
      </ul>
    </section>
  );
};

export default MlModelIngestionConfig;
