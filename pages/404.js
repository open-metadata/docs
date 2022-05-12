import Head from "next/head";
import { getMenu } from "../lib/api";
import Layout from "../components/layouts/globalTemplate";
import SideBar from "../components/navigation/sideBar";
import Footer from "../components/navigation/footer";
import Spacer from "../components/utilities/spacer";
import SummaryTiles from "../components/summaryTiles";

import styles from "../components/layouts/container.module.css";

export default function Home({ window, menu }) {
  return (
    <Layout window={window}>
      <Head>
        <title>404 | OpenMetadata Docs</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon32.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          content="Unlock the value of data assets with an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration."
          name="description"
        />
        <meta content="OpenMetadata Docs" property="og:title" />
        <meta
          content="Unlock the value of data assets with an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration."
          property="og:description"
        />
        <meta content="OpenMetadata Docs" name="twitter:title" />
        <meta
          content="Unlock the value of data assets with an end-to-end metadata management solution that includes data discovery, governance, data quality, observability, and people collaboration."
          name="twitter:description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.open-metadata.org/" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/sharing-image-facebook.jpg`}
        />
        <meta
          name="twitter:image"
          content={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/sharing-image-twitter.jpg`}
        />
      </Head>
      <section className={styles.Container}>
        <SideBar menu={menu} slug={["404"]} />
        <section className={styles.InnerContainer}>
          <article>
            <h1>Page not found :(</h1>

            <p>
              Maybe you were looking for:
            </p>

            <SummaryTiles />
          </article>
        </section>
        <Footer />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const props = {};
  props["menu"] = getMenu();

  return {
    props: props,
    revalidate: 60,
  };
}
