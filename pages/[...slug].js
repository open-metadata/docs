import fs from "fs";
import { join, basename } from "path";
import Script from "next/script";
import sortBy from "lodash/sortBy";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import remarkUnwrapImages from "remark-unwrap-images";
import classNames from "classnames";

// Site Components
import GDPRBanner from "../components/utilities/gdpr";
import {
  getArticleSlugs,
  getArticleSlugFromString,
  getMenu,
  getGDPRBanner,
} from "../lib/api";
import { getPreviousNextFromMenu } from "../lib/utils.js";
import { useAppContext } from "../context/AppContext";
import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";
import BreadCrumbs from "../components/utilities/breadCrumbs";
import SideBar from "../components/navigation/sideBar";
import Masonry from "../components/layouts/masonry";
import TileContainer from "../components/layouts/tileContainer";
import InlineCalloutContainer from "../components/layouts/inlineCalloutContainer";
import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";
import Helpful from "../components/utilities/helpful";
import { H1, H2, H3 } from "../components/blocks/headers";
import Psa from "../components/utilities/psa";
import FloatingNav from "../components/utilities/floatingNav";

// MDX Components
import Code from "../components/blocks/code";
import CodeTile from "../components/blocks/codeTile";
import Download from "../components/utilities/download";
import Flex from "../components/layouts/flex";
import Image from "../components/blocks/image";
import Important from "../components/blocks/important";
import Note from "../components/blocks/note";
import RefCard from "../components/blocks/refCard";
import Tile from "../components/blocks/tile";
import InlineCallout from "../components/blocks/inlineCallout";
import Tip from "../components/blocks/tip";
import Warning from "../components/blocks/warning";
import YouTube from "../components/blocks/youTube";
import Collapse from "../components/blocks/collape";
import styles from "../components/layouts/container.module.css";

// Content Components
import Requirements from "../components/content/requirements";
import MetadataIngestionService from "../components/content/metadata-ingestion-service";
import ConnectorIntro from "../components/content/connector-intro";
import IngestionScheduleAndDeploy from "../components/content/ingestion-schedule-and-deploy";
import ConnectorOutro from "../components/content/connector-outro";
import MetadataIngestionServiceDev from "../components/content/metadata-ingestion-service-dev";
import MetadataIngestionConfig from "../components/content/metadata-ingestion-config";

export default function Article({
  data,
  source,
  slug,
  menu,
  currMenuItem,
  prevMenuItem,
  nextMenuItem,
  paths,
  gdpr_data,
  filename,
}) {
  let suggestEditURL;
  const { sourceFile } = useAppContext();

  suggestEditURL = "https://github.com/open-metadata/docs/issues";

  const components = {
    Note,
    Tip,
    Important,
    Code,
    Warning,
    YouTube,
    Collapse,
    Masonry,
    CodeTile,
    InlineCalloutContainer,
    InlineCallout,
    TileContainer,
    Requirements,
    MetadataIngestionService,
    ConnectorIntro,
    IngestionScheduleAndDeploy,
    ConnectorOutro,
    MetadataIngestionServiceDev,
    MetadataIngestionConfig,
    Tile,
    RefCard,
    Image,
    Download,
    Flex,
    pre: (props) => <Code {...props} />,
    h1: H1,
    h2: H2,
    h3: H3,
    // iframe : WrappedIFrame
  };

  let previousArrow;
  let nextArrow;
  let arrowContainer;
  let keywordsTag;

  if (prevMenuItem) {
    previousArrow = (
      <ArrowLink
        link={prevMenuItem.url}
        type="back"
        content={prevMenuItem.name}
      />
    );
  } else if (nextMenuItem) {
    previousArrow = <ArrowLink link="./" type="back" content="Home" />;
  }

  if (nextMenuItem) {
    nextArrow = (
      <ArrowLink
        link={nextMenuItem.url}
        type="next"
        content={nextMenuItem.name}
      />
    );
  }

  if (nextMenuItem || prevMenuItem) {
    arrowContainer = (
      <>
        <ArrowLinkContainer>{previousArrow}</ArrowLinkContainer>
        <ArrowLinkContainer> {nextArrow}</ArrowLinkContainer>
      </>
    );
  }

  if (data.keywords) {
    keywordsTag = <meta name="keywords" content={data.keywords} />;
  }

  return (
    <MDXProvider
      components={{
        // Override some default Markdown components.
        img: Image,
      }}
    >
      <Layout>
        {/* <GDPRBanner {...gdpr_data} /> */}

        <Script id="show-banner"
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
                `
            }}
        /> 

        <section className={styles.Container}>
          <SideBar slug={slug} menu={menu} />
          <Head>
            <title>{data.title} - OpenMetadata Docs</title>
            <link rel="icon" href="/favicon.svg" />
            <link rel="alternate icon" href="/favicon32.ico" />
            <meta name="theme-color" content="#ffffff" />
            {keywordsTag}
            <meta
              content={`${data.title} - OpenMetadata Docs`}
              property="og:title"
            />
            <meta
              content={`${data.title} - OpenMetadata Docs`}
              name="twitter:title"
            />
            {data.description && (
              <React.Fragment>
                <meta content={data.description} name="description" />
                <meta content={data.description} property="og:description" />
                <meta content={data.description} name="twitter:description" />
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
          <section className={styles.InnerContainer} id="documentation">
            <BreadCrumbs slug={slug} menu={menu} />
            <article
              id="content-container"
              className={classNames("leaf-page", styles.ArticleContainer)}
            >
              <FloatingNav slug={slug} menu={menu} />
              <div className={classNames("content", styles.ContentContainer)}>
                <MDXRemote {...source} components={components} />
                {/* <Helpful slug={slug} sourcefile={suggestEditURL} /> */}
              </div>
            </article>
            <Psa />
            <div className={styles.Buttons}>{arrowContainer}</div>
          </section>
          <Footer />
        </section>
      </Layout>
    </MDXProvider>
  );
}

export async function getStaticProps(context) {
  const paths = await getStaticPaths();
  const props = {};
  let location = `/${context.params.slug.join("/")}`;
  const gdpr_data = await getGDPRBanner();

  const menu = getMenu();

  if ("slug" in context.params) {
    let filename;

    paths.paths.forEach((obj) => {
      if (obj.params.location == location) {
        filename = obj.params.fileName;
      }
    });

    // Get the last element of the array to find the MD file
    const fileContents = fs.readFileSync(filename, "utf8");
    const { data, content } = matter(fileContents);

    const source = await serialize(content, {
      scope: data,
      mdxOptions: {
        rehypePlugins: [
          require("rehype-slug"),
          require("rehype-autolink-headings"),
        ],
        remarkPlugins: [remarkUnwrapImages],
      },
    });

    const { current, prev, next } = getPreviousNextFromMenu(menu, location);

    props["menu"] = menu;
    props["gdpr_data"] = gdpr_data;
    props["data"] = data;
    props["filename"] = filename;
    props["slug"] = context.params.slug;
    props["source"] = source;
    props["currMenuItem"] = current
      ? {
          name: current.name,
          url: current.url,
          isVersioned: !!current.isVersioned,
        }
      : null;
    props["nextMenuItem"] = next ? { name: next.name, url: next.url } : null;
    props["prevMenuItem"] = prev ? { name: prev.name, url: prev.url } : null;
  }

  return {
    props: props,
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths = [];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data, content } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        fileName: articles[index],
        title: data.title ? data.title : "Untitled",
        description: data.description ? data.description : "",
      },
    };

    paths.push(path);
  }

  return {
    paths: paths,
    fallback: false,
  };
}
