import React, { useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import useVersion from "../../lib/useVersion.js";
import { ReactComponent as SvgArrow } from "../../images/icons/arrow.svg";

import styles from "./navChild.module.css";

const NavChild = ({ slug, page, color, className }) => {
  const [manualState, setManualState] = useState(null);
  const version = useVersion();

  const isNum = /^[\d\.]+$/.test(slug[0]);

  if (isNum) {
    slug.shift();
  }

  const slugStr = `/${slug.join("/")}`;
  const active = slugStr === page.url ? true : false;
  const shouldAutoOpen = slugStr.startsWith(page.url);
  const opened = manualState ?? shouldAutoOpen;

  let subNav;

  const toggleAccordion = () => {
    setManualState(!opened);
  };

  const visibleItems = page.children.filter((child) => child.visible !== false);
  if (page.children?.length > 0 && visibleItems.length > 0 && opened) {
    subNav = (
      <ul className={styles.List}>
        {page.children.map((child) => (
          <NavChild
            slug={slug}
            key={child.menu_key}
            page={child}
            color={color}
            depth={child.depth + 1}
          />
        ))}
      </ul>
    );
  }

  let accordion;

  if (page.children?.length > 0 && visibleItems.length > 0) {
    accordion = (
      <div className={`${styles.Accordion} -ml-[79px] pl-[79px]`}>
        <i
          className={classNames(
            styles.AccordionIcon,
            opened ? "close" : "open"
          )}
          onClick={toggleAccordion}
        >
          {opened ? (
            <SvgArrow className="rotate-90 duration-100" />
          ) : (
            <SvgArrow />
          )}
        </i>
      </div>
    );
  }

  let link;
  let icon;
  let target;
  let url = page.url;

  const isLocalPage = page.url.startsWith("/");

  if (!isLocalPage) {
    icon = <i className={styles.ExternalIcon}>open_in_new</i>;
    target = "_blank";
  }

  if (page.isVersioned && version && isLocalPage) {
    // We need to version this URL, check if the URL has a version for this version
    const newSlug = page.url.split("/");
    newSlug[0] = version;
    url = `/${newSlug.join("/")}`;
  }

  link = (
    <Link href={url} className="cursor-pointer">
      <span
        className={`${classNames(
          styles.LinkContainer,
          styles.PageName,
          active && styles.ActivePage
        )} font-[500] text-[#76746F]`}
      >
        <a className={classNames("not-link", styles.Link)} target={target}>
          <span
            className={`${classNames(
              styles.PageName,
              active && styles.ActivePage
            )} font-[500] text-[#76746F]`}
          >
            {page.name}
            {icon}
          </span>
        </a>
        {accordion}
      </span>
    </Link>
  );

  return (
    <li className={`${classNames(styles.Container, className)} leading-none`}>
      {link}
      {subNav}
    </li>
  );
};

export default NavChild;
