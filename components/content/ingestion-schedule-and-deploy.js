import { H1, H2, H3 } from "../blocks/headers";
import Image from "../blocks/image";

const IngestionScheduleAndDeploy = ({connector}) => {

    return (
        <section>
            <H3>6. Schedule the Ingestion and Deploy</H3>
            <p>
                Scheduling can be set up at an hourly, daily, or weekly cadence. The timezone is in UTC. Select a Start Date to schedule for ingestion. It is optional to add an End Date.
            </p>
            <p>
                Review your configuration settings. If they match what you intended, click Deploy to create the service and schedule metadata ingestion.
            </p>
            <p>
                If something doesn't look right, click the Back button to return to the appropriate step and change the settings as needed.
            </p>
            <Image
                src="/images/metadata-ui/ingestion/workflows/metadata/connectors/schedule.png"
                alt="Schedule the Workflow"
                caption="Schedule the Ingestion Pipeline and Deploy"
            />
            <p>
                After configuring the workflow, you can click on Deploy to create the pipeline.
            </p>

            <H3>7. View the Ingestion Pipeline</H3>
            <p>
                Once the workflow has been successfully deployed, you can view the Ingestion Pipeline running from the Service Page.
            </p>
            <Image
                src="/images/metadata-ui/ingestion/workflows/metadata/connectors/view-ingestion-pipeline.png"
                alt="View Ingestion Pipeline"
                caption="View the Ingestion Pipeline from the Service Page"
            />

            <H3>8. Workflow Deployment Error</H3>
            <p>
                If there were any errors during the workflow deployment process, the Ingestion Pipeline Entity will still be created, but no workflow will be present in the Ingestion container.
            </p>
            <p>
                You can then edit the Ingestion Pipeline and Deploy it again.
            </p>
            <Image
                src="/images/metadata-ui/ingestion/workflows/metadata/connectors/workflow-deployment-error.png"
                alt="Workflow Deployment Error"
                caption="Edit and Deploy the Ingestion Pipeline"
            />
            <p>
                From the Connection tab, you can also Edit the Service if needed.
            </p>

        </section>
    );
};

export default IngestionScheduleAndDeploy;
