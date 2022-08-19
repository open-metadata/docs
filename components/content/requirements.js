import InlineCalloutContainer from "../layouts/inlineCalloutContainer";
import InlineCallout from "../blocks/inlineCallout";
import { H1, H2, H3 } from "../blocks/headers";

const Requirements = () => {
    return (
        <article>
            <section>
                  <H2>Requirements</H2>
                  <InlineCallout color="violet-70" icon="description" bold="OpenMetadata 0.12 or later" href="/deployment">
                    To deploy OpenMetadata, check the <a href="/deployment">Deployment</a> guides.
                  </InlineCallout>
                <p>To run the Ingestion via the UI you'll need to use the OpenMetadata Ingestion Container, which comes shipped with custom Airflow plugins to handle the workflow deployment.</p>
            </section>
        </article>
    );
};

export default Requirements;
