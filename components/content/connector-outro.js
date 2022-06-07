import TileContainer from "../layouts/tileContainer";
import Tile from "../blocks/tile";
import { H1, H2, H3 } from "../blocks/headers";

const ConnectorOutro = ({connector, hasUsage, hasProfiler, hasDBT}) => {

    const profiler = (
        <section>
            <H2>Data Profiler and Quality Tests</H2>
            <Tile
                 icon="manage_accounts"
                 title="Profiler Workflow"
                 text="Learn more about how to configure the Data Profiler and about executing Data Quality tests from the UI."
                 link="/metadata-ui/ingestion/workflows/profiler"
             />
        </section>
    )

    const dbt = (
        <section>
            <H2>DBT Integration</H2>
            <Tile
                 icon="manage_accounts"
                 title="DBT Integration"
                 text="Learn more about how to ingest DBT models' definitions and their lineage."
                 link="/metadata-ui/ingestion/workflows/metadata/dbt"
             />
        </section>
    )

    const usage = (
            <section>
                <H2>Query Usage and Lineage Ingestion</H2>
                <Tile
                        icon="manage_accounts"
                        title="Usage Workflow"
                        text="Learn more about how to configure the Usage Workflow to ingest Query and Lineage information from the UI."
                        link="/metadata-ui/ingestion/workflows/usage"
                    />
            </section>
        );



    let block = (
        <section>
        {hasUsage ? usage : null}
        {hasProfiler ? profiler : null}
        {hasDBT ? dbt : null}
        </section>
    )

    return block;
};

export default ConnectorOutro;
