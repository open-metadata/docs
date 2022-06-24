import Link from "next/link";
import classNames from "classnames";

import styles from "./inlineCallout.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  let bordercolor = "";
  let backgroundColor = "";
  let textColor = "";

  switch (color) {
    case "violet-70":
      bordercolor = styles.VioletBackground;
      backgroundColor = styles.LibraryBackground;
      textColor = styles.LibraryText;
      break;
    case "l-blue-70":
      bordercolor = styles.BlueBackground;
      backgroundColor = styles.CloudBackground;
      textColor = styles.CloudText;
      break;
    case "yellow-70":
      bordercolor = styles.YellowBackground;
      backgroundColor = styles.KBBackground;
      textColor = styles.KBText;
      break;
    default:
      bordercolor = styles.TransparentBackground;
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
