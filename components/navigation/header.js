import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import dynamic from "next/dynamic";
// import Navigation from
import MobileNav from "./mobileNav";
import { ReactComponent as SvgLogo } from "../../images/icons/omd.svg";
import { ReactComponent as Github } from "../../images/icons/github.svg";
import { ReactComponent as Slack } from "../../images/icons/slack.svg";
import { ReactComponent as Cloud } from "../../images/icons/cloud.svg";
import { ReactComponent as API } from "../../images/icons/api.svg";

import styles from "./header.module.css";

const ThemeToggle = dynamic(() => import("../utilities/themeToggle"), {
  ssr: false,
});
import Search from "../utilities/search";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleScroll = () => {
    let top = window.scrollY;
    top > 20 ? setIsSticky(true) : setIsSticky(false);
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  let mobileNav;
  if (windowWidth <= 1023) {
    mobileNav = <MobileNav />;
  }

  return (
    <header
      className={classNames(
        styles.Container,
        isSticky ? styles.stickyContainer : styles.standardContainer
      )}
    >
      <nav className={styles.Navigation} id="main-header">
        <Link href="/">
          <a className={classNames(styles.LogoContainer, "not-link")}>
            <SvgLogo />
          </a>
        </Link>

        <section className={styles.NavigationContainer}>
          <Search />
          {/* <ThemeToggle /> */}
          <div className={styles.iconContainer}>
            <a
              href="https://slack.open-metadata.org"
              target="_blank"
              title="Slack"
            >
              <Slack className="h-6" />
            </a>
            <a
              href="https://github.com/open-metadata/OpenMetadata"
              target="_blank"
              title="Github"
            >
              <Github />
            </a>
            <a href="/swagger.html" target="_blank" title="Swagger">
              <API />
            </a>
            <a
              className="btn fw-500 btn-primary rounded-pill"
              href="https://www.getcollate.io/"
              target="_blank"
            >
              <button className="bg-[#7147e8]  pl-[1.125] pr-[1.125] rounded-full w-[55.5px] h-[44px] justify-center">
                <Cloud className="m-auto" />
              </button>
            </a>
          </div>
          {mobileNav}
        </section>
      </nav>
    </header>
  );
};

export default Header;
