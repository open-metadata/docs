import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./tile.module.css";

const Tile = ({
  children,
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
      : background === "pink-70"
      ? styles.PinkBackground
      : background === "green-70"
      ? styles.GreenBackground
      : background === "purple-70"
      ? styles.PurpleBackground
      : styles.GreenBackground;

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
        {newTab ? (
          <a
            className={classNames("not-link", styles.Link)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image}
            <div>
              <h4 className={styles.Title}>{title}</h4>
              <p className={styles.Text}>{text}</p>
              {children}
            </div>
          </a>
        ) : (
          <a className={classNames("not-link", styles.Link)}>
            {image}
            <div>
              <h4 className={styles.Title}>{title}</h4>
              <p className={styles.Text}>{text}</p>
              {children}
            </div>
          </a>
        )}
      </Link>
    </div>
  );
};

export default Tile;
