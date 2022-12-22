import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";
import { ReactComponent as Quickstart } from "../images/icons/Quickstart_tile.svg";
import { ReactComponent as Knowledge } from "../images/icons/knowledge.svg";
import { ReactComponent as Deployment } from "../images/icons/Deployment_tile.svg";
import { ReactComponent as SaaS } from "../images/icons/saas.svg";
import { ReactComponent as Connectors } from "../images/icons/connectors.svg";
import { COLLATE_WEBSITE_LINK } from "../Constants/Common.constants";

const SummaryTiles = () => {
  return (
    <TileContainer>
      <Tile
        icon={<Quickstart />}
        title="Quickstart"
        text="Deploy OpenMetadata and connect to your sources in minutes!"
        background="yellow-70"
        bordercolor="yellow-70"
        link="/quick-start"
      />

      <Tile
        icon={<SaaS />}
        title="SaaS"
        text="Enjoy 100% of OpenMetadata with 0% of the hassle."
        background="purple-70"
        bordercolor="purple-70"
        link={COLLATE_WEBSITE_LINK}
        size="half"
      />

      <Tile
        icon={<Knowledge />}
        title="Knowledge Base"
        text="Check out some frequent questions and answers"
        background="pink-70"
        bordercolor="pink-70"
        link="https://github.com/open-metadata/OpenMetadata/discussions/categories/q-a"
      />

      <Tile
        icon={<Deployment />}
        title="Deployment"
        text="Deploy in Bare Metal, Docker or Kubernetes."
        background="green-70"
        bordercolor="green-70"
        link="/deployment"
        size="half"
      />
      <Tile
        icon={<Connectors />}
        title="Connectors"
        text="Connect to database, dashboard, messaging, pipeline and ML services."
        background="blue-70"
        bordercolor="blue-70"
        link="/connectors"
      />
    </TileContainer>
  );
};

export default SummaryTiles;
