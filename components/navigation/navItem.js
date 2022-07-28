import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { urlInChildren } from "../../lib/utils.js";
import NavChild from "./navChild";
import { ReactComponent as Quickstart } from "../../images/icons/Quickstart.svg";
import { ReactComponent as Deployment } from "../../images/icons/Deployment.svg";
import { ReactComponent as Development } from "../../images/icons/Development.svg";
import { ReactComponent as Overview } from "../../images/icons/Overview.svg";
import { ReactComponent as SDK } from "../../images/icons/SDK.svg";
import { ReactComponent as MainConcept } from "../../images/icons/MainConcept.svg";
import { ReactComponent as OpenMetadata } from "../../images/icons/OpenMetadata.svg";

import styles from "./navItem.module.css";

const NavItem = ({ page, slug, condensed, className }) => {
  let subNav;
  let navItem;
  let navBox;
  let active = urlInChildren(page, `/${slug.join("/")}`);
  let isCondensed = condensed ? condensed : false;

  // We only want the color to show when we're either active, or the menu is condensed.
  let color =
    page.color === "violet-70"
      ? styles.LibraryCategory
      : page.color === "l-blue-70"
      ? styles.CloudCategory
      : styles.KBCategory;
  color = isCondensed || active ? color : "";

  let icon = "";
  switch (page.icon) {
    case "quickstart":
      icon = <Quickstart />;
      break;
    case "overview":
      icon = <Overview />;
      break;
    case "deployment":
      icon = <Deployment />;
      break;
    case "openmetadata":
      icon = <OpenMetadata />;
      break;
    case "main-concepts":
      icon = <MainConcept />;
      break;
    case "developers":
      icon = <Development />;
      break;
    case "sdk":
      icon = <SDK />;
      break;
    default:
      icon = page.category;
  }
  navBox = (
    <section
      className={classNames(
        styles.HeadingContainer,
        isCondensed ? styles.CondensedHeadingContainer : ""
      )}
    >
      <div
        className={classNames(
          styles.HeadingIconContainer,
          isCondensed ? styles.CondensedHeadingIconContainer : "",
          page.color === "violet-70"
            ? styles.LibraryIcon
            : page.color === "l-blue-70"
            ? styles.CloudIcon
            : styles.KBIcon
        )}
      >
        <i className={styles.IconSidebar}>{icon}</i>{" "}
      </div>
      <p
        className={`${classNames(
          styles.CategoryName,
          isCondensed ? styles.CondensedCategoryName : "",
          color
        )} text-sm uppercase font-[500]`}
      >
        {page.name}
      </p>
    </section>
  );

  if (page.children && page.children.length > 0) {
    subNav = (
      <ul
        className={classNames(
          styles.SubNav,
          isCondensed ? styles.CondensedSubNav : styles.ExpandedSubNav
        )}
      >
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            page={child}
            color={page.color}
            key={child.menu_key}
            depth={child.depth + 1}
            className={className}
          />
        ))}
      </ul>
    );
  }

  if (page.url.startsWith("/")) {
    navItem = (
      <li className={styles.NavItem} id={page.menu_key}>
        {page.url === "/library" ? (
          <a href={page.url} className="not-link">
            {navBox}
          </a>
        ) : (
          <Link href={page.url}>
            <a className="not-link">{navBox}</a>
          </Link>
        )}
        {subNav}
      </li>
    );
  } else {
    navItem = (
      <li className={styles.NavItem} id={page.menu_key}>
        <a className="not-link" href={page.url} target="_blank">
          {navBox}
        </a>
        {subNav}
      </li>
    );
  }

  return navItem;
};

export default NavItem;
