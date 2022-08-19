import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import classNames from "classnames";

import bus from "../../lib/bus";
import NavItem from "../navigation/navItem";

import styles from "./sideBar.module.css";
import { ReactComponent as Github } from "../../images/icons/github.svg";
import { ReactComponent as Slack } from "../../images/icons/slack.svg";
import { ReactComponent as Cloud } from "../../images/icons/cloud.svg";
import { ReactComponent as API } from "../../images/icons/api.svg";

const SideBar = ({ menu, slug }) => {
  const [isCondensed, setIsCondensed] = useState(false);
  const [isSticky, setIsSticky] = useState("none");
  const [isOver, setIsOver] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light-mode");
  const [hasSlug, setHasSlug] = useState("");

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(false);
      setIsOver(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(true);
      setIsOver(false);
    }
  };

  const checkExpanded = () => {
    if (window.innerWidth < 1250 && window.innerWidth >= 1024) {
      setIsCondensed(true);
    } else {
      setIsCondensed(false);
    }
  };

  const handleScroll = (e) => {
    // We check if the user scrolled on the whole page
    const windowScroll = window.scrollY;
    // But we also check if the user hasn't scrolled on the page, but scrolled inside the sidebar
    const sideBarScroll = e.target.scrollTop;

    if (windowScroll > 20) {
      setIsSticky("window");
    } else if (sideBarScroll > 5) {
      setIsSticky("scrollbar");
    } else {
      setIsSticky("none");
    }
  };

  const debouncedCheckExpanded = debounce(checkExpanded, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedCheckExpanded);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("ChangeTheme", handleTheme);

    bus.on("nav_open", () => setIsOpen(true));
    bus.on("nav_closed", () => setIsOpen(false));

    checkExpanded();
    setHasSlug(window.location.href);

    return () => {
      window.removeEventListener("resize", debouncedCheckExpanded);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  let navItems;
  navItems = menu.map((page) => (
    <NavItem
      slug={slug}
      key={page.menu_key}
      page={page}
      depth={page.depth + 1}
      condensed={isCondensed}
      // className={isOver && styles.OverNavItem}
    />
  ));

  return (
    <section
      className={classNames(
        styles.Container,
        isOpen ? styles.OpenNav : styles.ClosedNav,
        isOver ? styles.OverNav : styles.CollapsedNav
      )}
      onScroll={(e) => handleScroll(e)}
    >
      <div className={styles.iconContainer}>
        <a href="https://slack.open-metadata.org" target="_blank" title="Slack">
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
          href="https://share.hsforms.com/1fstvMCeZRZKTYA4nG1VTPgcq0j9"
          target="_blank"
        >
          <button className="bg-[#7147e8]  pl-[1.125] pr-[1.125] rounded-full w-[55.5px] h-[44px] justify-center">
            <Cloud className="m-auto" />
          </button>
        </a>
      </div>
      <div
        className={classNames(
          styles.TopGradient,
          isSticky === "window"
            ? styles.WindowStickyGradient
            : isSticky === "scrollbar"
            ? styles.ScrollBarStickyGradient
            : styles.StandardGradient
        )}
      />
      <nav
        className="pb-[1rem]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul className={`${styles.NavList} mx-0`}>{navItems}</ul>
      </nav>
    </section>
  );
};

export default SideBar;
