import TileContainer from "../layouts/tileContainer";
import Tile from "../blocks/tile";
import { H1, H2, H3 } from "../blocks/headers";

const ConnectorIntro = ({ service, connector, hasUsage, hasProfiler, hasDBT, goal }) => {
  let toc;
  let block;
  let from;
  let title;

  const serviceType = service ? service : "database"

  if (goal == "UI" || goal == null) {
    title = connector;
    from = "from the OpenMetadata UI";
  }
  if (goal == "Airflow") {
    title = "Run " + connector + " using Airflow SDK";
    from = "using your own Airflow instance";
  }
  if (goal == "CLI") {
    title = "Run " + connector + " using the metadata CLI";
    from = "using the metadata CLI";
  }

  const intro = (
    <section>
      <H1>{title}</H1>
      <p className="content mb-0">
        In this section, we provide guides and references to use the {connector}{" "}
        connector.
      </p>
      <br />
    </section>
  );

  const developers = (
    <section>
      <p className="content mb-0">
        If you don't want to use the OpenMetadata Ingestion container to
        configure the workflows via the UI, then you can check the following
        docs to connect using Airflow SDK or with the CLI.
      </p>

      <TileContainer>
        <Tile
          icon="air"
          title="Ingest with Airflow"
          text="Configure the ingestion using Airflow SDK"
          link={
            "/metadata-ui/connectors/" +
            serviceType + "/" +
            connector.toLowerCase() +
            "/airflow"
          }
          size="half"
        />
        <Tile
          icon="account_tree"
          title="Ingest with the CLI"
          text="Run a one-time ingestion using the metadata CLI"
          link={
            "/metadata-ui/connectors/" +
            serviceType + "/" +
            connector.toLowerCase() +
            "/cli"
          }
          size="half"
        />
      </TileContainer>
    </section>
  );

  toc = (
    <section>
      <p className="content mb-0">
        Configure and schedule {connector} metadata and profiler workflows from
        the OpenMetadata UI:
      </p>
      <ul>
        <li>
          <a href="#requirements">Requirements</a>
        </li>
        <li>
          <a href="#metadata-ingestion">Metadata Ingestion</a>{" "}
        </li>
        {hasUsage ? (
          <li>
            <a href="#query-usage-and-lineage-ingestion">
              Query Usage and Lineage Ingestion
            </a>
          </li>
        ) : null}
        {hasProfiler ? (
          <li>
            <a href="#data-profiler-and-quality-tests">
              Data Profiler and Quality Tests
            </a>{" "}
          </li>
        ) : null}
        {hasDBT ? (
          <li>
            <a href="#dbt-integration">DBT Integration</a>{" "}
          </li>
        ) : null}
      </ul>
    </section>
  );

  if (goal == "UI" || goal == null) {
    block = (
      <section>
        {intro}
        {toc}
        {developers}
      </section>
    );
  }

  if (goal == "Airflow" || goal == "CLI") {
    block = (
      <section>
        {intro}
        {toc}
      </section>
    );
  }

  return block;
};

export default ConnectorIntro;
