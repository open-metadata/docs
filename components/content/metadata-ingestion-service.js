import { H1, H2, H3 } from "../blocks/headers";
import Image from "../blocks/image";

const MetadataIngestionService = ({connector}) => {

    return (
        <section>
            <H2>Metadata Ingestion</H2>
            <H3>1. Visit the Services Page</H3>
            <p>
                The first step is ingesting the metadata from your sources. Under Settings, you will find a Services link an external source system to OpenMetadata.
                Once a service is created, it can be used to configure metadata, usage, and profiler workflows.
            </p>
            <p>
                To visit the Services page, select Services from the Settings menu.
            </p>

            <Image
                src="/images/metadata-ui/ingestion/workflows/metadata/connectors/visit-services.png"
                alt="Visit Services Page"
                caption="Find Services under the Settings menu"
            />

            <H3>2. Create a New Service</H3>
            <p>
                Click on the Add New Service button to start the Service creation.
            </p>
            <Image
                src="/images/metadata-ui/ingestion/workflows/metadata/connectors/create-service.png"
                alt="Create a new service"
                caption="Add a new Service from the Services page"
            />

            <H3>3. Select the Service Type</H3>
            <p>
                Select {connector} as the service type and click Next.
            </p>
            <Image
                src={"/images/metadata-ui/ingestion/workflows/metadata/connectors/" + connector + "/select-service.png"}
                alt="Select Service"
                caption="Select your service from the list"
            />

            <H3>4. Name and Describe your Service</H3>
            <p>
                Provide a name and description for your service as illustrated below.
            </p>
            <h4>Service Name</h4>
            <p>
                OpenMetadata uniquely identifies services by their Service Name.
                Provide a name that distinguishes your deployment from other services, including the other {connector} services
                that you might be ingesting metadata from.
            </p>
            <Image
                src={"/images/metadata-ui/ingestion/workflows/metadata/connectors/" + connector + "/add-new-service.png"}
                alt="Add New Service"
                caption="Provide a Name and description for your Service"
            />

            <H3>5. Configure the Service Connection</H3>
            <p>
                In this step, we will configure the connection settings required for this connector.
                Please follow the instructions below to ensure that you've configured the connector to read from your {connector} service as desired.
            </p>
            <Image
                src={"/images/metadata-ui/ingestion/workflows/metadata/connectors/" + connector + "/service-connection.png"}
                alt="Configure service connection"
                caption="Configure the service connection by filling the form"
            />
            <p>
                Once the credentials have been added, click on Test Connection and Save the changes.
            </p>
            <Image
                src={"/images/metadata-ui/ingestion/workflows/metadata/connectors/test-connection.png"}
                alt="Test Connection"
                caption="Test the connection and save the Service"
            />


        </section>
    );
};

export default MetadataIngestionService;
