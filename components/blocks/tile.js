import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./tile.module.css";

const Tile = ({
  img,
  dark,
  icon,
  background,
  color,
  rotate,
  size,
  link,
  title,
  text,
  borderColor,
  newTab,
}) => {
  const [theme, setTheme] = useState("light-mode");

  const tileSize =
    size === "full"
      ? styles.Full
      : size === "half"
      ? styles.Half
      : size === "third"
      ? styles.Third
      : size === "two-third"
      ? styles.TwoThirds
      : styles.Third;

  useEffect(() => {
    window.addEventListener("ChangeTheme", handleTheme);

    return () => {
      window.removeEventListener("ChangeTheme", handleTheme);
    };
  }, []);

  const handleTheme = () => {
    setTheme(document.body.dataset.theme);
  };

  let image;
  if (img) {
    image = <img src={img} className={styles.Icon} />;
  } else {
    image = (
      <i className={classNames("material-icons-sharp", styles.Icon)}>
        {icon || "downloading"}
      </i>
    );
  }

  const bordercolor =
    background === "yellow-70"
      ? styles.YellowBackground
      : background === "blue-70"
      ? styles.BlueBackground
      : background === "violet-70"
      ? styles.VioletBackground
      : styles.VioletBackground;

  const backgroundColor = styles.TransparentBackground;

  return (
    <div
      className={classNames(
        styles.Container,
        tileSize || "third",
        backgroundColor,
        bordercolor
      )}
    >
      <Link href={link || "/"}>
        {
          newTab ?
          <a className={classNames("not-link", styles.Link)} target="_blank" rel="noopener noreferrer" >
          {image}
          <div>
            <h4 className={styles.Title}>{title}</h4>
            <p className={styles.Text}>
              {text}
            </p>
          </div>
        </a>
          : <a className={classNames("not-link", styles.Link)} >
          {image}
          <div>
            <h4 className={styles.Title}>{title}</h4>
            <p className={styles.Text}>
              {text}
            </p>
          </div>
        </a>
        }
        
      </Link>
    </div>
  );
};

export default Tile;
