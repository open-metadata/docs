import Link from "next/link";
import classNames from "classnames";

import styles from "./inlineCallout.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  let bordercolor = "";
  switch (color) {
    case "violet-70":
      bordercolor = styles.VioletBackground;
      break;
    case "l-blue-70":
      bordercolor = styles.BlueBackground;
      break;
    case "yellow-70":
      bordercolor = styles.YellowBackground;
      break;
    default:
      bordercolor = styles.TransparentBackground;
  }

  let backgroundColor = "";
  switch (color) {
    case "violet-70":
      backgroundColor = styles.LibraryBackground;
      break;
    case "l-blue-70":
      backgroundColor = styles.CloudBackground;
      break;
    default:
      backgroundColor = styles.KBBackground;
  }

  let textColor = "";
  switch (color) {
    case "violet-70":
      textColor = styles.LibraryText;
      break;
    case "l-blue-70":
      textColor = styles.CloudText;
      break;
    default:
      textColor = styles.KBText;
  }

  return (
    <section className={classNames(styles.Container, bordercolor)}>
      <Link href={href}>
        <a
          className={classNames(
            styles.IconContainer,
            backgroundColor,
            "not-link"
          )}
        >
          <i className={styles.Icon}>{icon}</i>
        </a>
      </Link>
      <article>
        <p className={styles.Text}>
          <Link href={href}>
            <a className={classNames("not-link", styles.Link, textColor)}>
              {bold}
            </a>
          </Link>{" "}
          {children}
        </p>
      </article>
    </section>
  );
};

export default InlineCallout;
