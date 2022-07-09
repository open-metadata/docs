import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";

const SummaryTiles = () => {
  return (
    <TileContainer>
      <Tile
        icon="av_timer"
        title="Quickstart"
        text="Deploy OpenMetadata and connect to your sources in minutes!"
        background="yellow-70"
        bordercolor="yellow-70"
        link="/quick-start"
      />

      <Tile
        icon="add_task"
        title="Connectors"
        text="Connect to database, dashboard, messaging, pipeline and ML services."
        background="blue-70"
        bordercolor="blue-70"
        link="/openmetadata/connectors"
      />

      <Tile
        icon="tips_and_updates"
        title="Knowledge Base"
        text="Check out some frequent questions and answers"
        background="violet-70"
        bordercolor="violet-70"
        link="https://github.com/open-metadata/OpenMetadata/discussions/categories/q-a"
      />

      <Tile
        icon="settings_suggest"
        title="Deployment"
        text="Deploy in Bare Metal, Docker or Kubernetes."
        background="yellow-70"
        bordercolor="yellow-70"
        link="/deployment"
        size="half"
      />

      <Tile
        icon="cloud"
        title="SaaS"
        text="Enjoy 100% of OpenMetadata with 0% of the hassle."
        background="blue-70"
        bordercolor="blue-70"
        link="https://share.hsforms.com/1fstvMCeZRZKTYA4nG1VTPgcq0j9"
        size="half"
      />

    </TileContainer>
  );
};

export default SummaryTiles;
