import React from "react";
import classNames from "classnames";
import Head from "next/head";
import Script from "next/script";

import { getMenu, getGDPRBanner } from "../lib/api";

import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";

import SideBar from "../components/navigation/sideBar";
import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";

import GDPRBanner from "../components/utilities/gdpr";
import Spacer from "../components/utilities/spacer";

import SummaryTiles from "../components/summaryTiles";

import NewsContainer from "../components/layouts/newsContainer";
import YouTube from "../components/blocks/youTube";

import { H1, H2 } from "../components/blocks/headers";
import NewsEntry from "../components/blocks/newsEntry";
import Button from "../components/blocks/button";
import InlineCallout from "../components/blocks/inlineCallout";
import NoteSplit from "../components/blocks/noteSplit";

import { attributes } from "../content/index.md";
import styles from "../components/layouts/container.module.css";
import { ReactComponent as Blog1 } from "../public/blog1.svg";
import { ReactComponent as Blog2 } from "../public/blog2.svg";
import { ReactComponent as Blog3 } from "../public/blog3.svg";
import { ReactComponent as Blog4 } from "../public/blog4.svg";

export default function Home({ window, menu, gdpr_data }) {
  let { description } = attributes;

  return (
    <Layout window={window}>
      <Head>
        <title>OpenMetadata Documentation</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon32.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}`}
        />
        <meta content="OpenMetadata Docs" property="og:title" />
        <meta content="OpenMetadata Docs" name="twitter:title" />
        {description && (
          <React.Fragment>
            <meta content={description} name="description" />
            <meta content={description} property="og:description" />
            <meta content={description} name="twitter:description" />
          </React.Fragment>
        )}
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
      <Script
        id="show-banner"
        dangerouslySetInnerHTML={{
          __html: `              
                (function(window, document, dataLayerName, id) {
                  window[dataLayerName]=window[dataLayerName]||[],window[dataLayerName].push({start:(new Date).getTime(),event:"stg.start"});var scripts=document.getElementsByTagName('script')[0],tags=document.createElement('script');
                  function stgCreateCookie(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+24*c*60*60*1e3),d="; expires="+e.toUTCString()}document.cookie=a+"="+b+d+"; path=/"}
                  var isStgDebug=(window.location.href.match("stg_debug")||document.cookie.match("stg_debug"))&&!window.location.href.match("stg_disable_debug");stgCreateCookie("stg_debug",isStgDebug?1:"",isStgDebug?14:-1);
                  var qP=[];dataLayerName!=="dataLayer"&&qP.push("data_layer_name="+dataLayerName),isStgDebug&&qP.push("stg_debug");var qPString=qP.length>0?("?"+qP.join("&")):"";
                  tags.async=!0,tags.src="https://collate.containers.piwik.pro/"+id+".js"+qPString,scripts.parentNode.insertBefore(tags,scripts);
                  !function(a,n,i){a[n]=a[n]||{};for(var c=0;c<i.length;c++)!function(i){a[n][i]=a[n][i]||{},a[n][i].api=a[n][i].api||function(){var a=[].slice.call(arguments,0);"string"==typeof a[0]&&window[dataLayerName].push({event:n+"."+i+":"+a[0],parameters:[].slice.call(arguments,1)})}}(i[c])}(window,"ppms",["tm","cm"]);
                  })(window, document, 'dataLayer', '85b94982-8c42-497f-96c9-353365f1fe7a');
                `,
        }}
      />

      {/*<GDPRBanner {...gdpr_data} />*/}

      <section className={styles.Container}>
        <SideBar menu={menu} slug={[]} />
        <section className={styles.InnerContainer}>
          <article>
            <H1>OpenMetadata Documentation</H1>
            <p>
              Unlock the value of data assets with an end-to-end metadata
              management solution that includes data discovery, governance, data
              quality, observability, and people collaboration.
            </p>

            <Spacer size="2rem" />

            <SummaryTiles />

            <H2>Overview</H2>
            <p>
              OpenMetadata enables <b>metadata management</b> end-to-end, giving
              you the ability to unlock the value of data assets in the common
              use cases of data discovery and governance, but also in emerging
              use cases related to data quality, observability, and people
              collaboration.
            </p>
            <p>
              Learn how OpenMetadata tries to solve the metadata problem and the
              features it provides in the following video 👇
            </p>

            <YouTube videoId="pF8L_mAtexo" start="0:00" end="9:29" />

            <br></br>

            <NewsContainer>
              <NewsEntry
                date="2022-07-07T16:05:00.000Z"
                title="OpenMetadata 0.11.0 release"
                text="Data Collaboration, Column-level Lineage, ML Models, Data Profiler, Advanced Search, Data Lake Connectors, and more."
                link="https://blog.open-metadata.org/openmetadata-0-11-release-8b82c85636a"
                image={<Blog1 />}
              />
              <NewsEntry
                date="2022-04-26T16:05:00.000Z"
                title="OpenMetadata 0.10.0 release"
                text="Backend APIs, Support for database schema objects, Hard deletion of entities, Refactor service connectors, DBT changes, Security updates, and more."
                link="https://blog.open-metadata.org/openmetadata-0-10-0-release-82c4f5533c3f"
                image={<Blog2 />}
              />
              <NewsEntry
                date="2022-03-07T16:05:00.000Z"
                title="ML is not just about ML"
                text="Understanding our dependencies and the role they play is crucial. If we can also bring this same knowledge to the users of the models and open a channel for sharing and collaborating, we are heading on the path to success."
                link="https://blog.open-metadata.org/ml-is-not-just-about-ml-c08eab242e84"
                image={<Blog3 />}
              />
              <NewsEntry
                date="2021-12-02T16:05:00.000Z"
                title="Why OpenMetadata is the Right Choice for you"
                text="OpenMetadata is a fresh start on how to do Metadata right from first principles."
                link="https://blog.open-metadata.org/why-openmetadata-is-the-right-choice-for-you-59e329163cac"
                image={<Blog4 />}
              />
              <Button blueButton link="https://blog.open-metadata.org/">
                View all updates
              </Button>
            </NewsContainer>
          </article>

          <ArrowLinkContainer>
            <ArrowLink link="/quick-start" type="next" content="Get started" />
          </ArrowLinkContainer>
        </section>

        <Footer />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const props = {};
  props["menu"] = getMenu();
  props["gdpr_data"] = await getGDPRBanner();

  return {
    props: props,
    revalidate: 60,
  };
}
