import Link from "next/link";
import classNames from "classnames";

import styles from "./inlineCallout.module.css";

const InlineCallout = ({ children, icon, color, bold, href }) => {
  const backgroundColor =
    color === "violet-70"
      ? styles.LibraryBackground
      : color === "l-blue-70"
      ? styles.CloudBackground
      : styles.KBBackground;
  const textColor =
    color === "violet-70"
      ? styles.LibraryText
      : color === "l-blue-70"
      ? styles.CloudText
      : styles.KBText;
  const bordercolor =
    color === "violet-70"
      ? styles.YellowBackground
      : color === "l-blue-70"
      ? styles.VioletBackground
      : color === "orange-70"
      ? styles.PurpleBackground
      : styles.TransparentBackground;
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
