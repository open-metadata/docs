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
        link="/library/get-started"
      />

      <Tile
        icon="memory"
        title="API reference"
        text="Learn about our APIs, with actionable explanations of specific functions and features."
        background="blue-70"
        bordercolor="blue-70"
        link="/library/api-reference"
      />

      <Tile
        icon="collections"
        title="App gallery"
        text="Try out awesome apps created by our users, and curated from our forums or Twitter."
        background="violet-70"
        bordercolor="violet-70"
        link="https://streamlit.io/gallery"
      />
    </TileContainer>
  );
};

export default SummaryTiles;
