import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";

const SummaryTiles = () => {
  return (
    <TileContainer>
      <Tile
        icon="wb_incandescent"
        title="Quickstart"
        text="Deploy OpenMetadata and connect to your sources in minutes!"
        background="violet-70"
        link="/library/get-started"
      />

      <Tile
        icon="dvr"
        title="API reference"
        text="Learn about our APIs, with actionable explanations of specific functions and features."
        background="violet-70"
        link="/library/api-reference"
      />

      <Tile
        icon="grid_view"
        title="App gallery"
        text="Try out awesome apps created by our users, and curated from our forums or Twitter."
        background="orange-70"
        link="https://streamlit.io/gallery"
      />
    </TileContainer>
  );
};

export default SummaryTiles;
