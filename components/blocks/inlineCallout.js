import Link from "next/link";
import classNames from "classnames";
import { ReactComponent as SvgDocker } from "../../images/icons/Docker.svg";
import { ReactComponent as SvgSecurity } from "../../images/icons/bare_metal.svg";
import { ReactComponent as SvgKubernetes } from "../../images/icons/kubernetes.svg";

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
      textColor = styles.LibraryText;
      break;
    case "yellow-70":
      bordercolor = styles.YellowBackground;
      backgroundColor = styles.KBBackground;
      textColor = styles.LibraryText;
      break;
    default:
      bordercolor = styles.TransparentBackground;
  }

  switch (icon) {
    case "celebration":
      icon = <SvgDocker />;
      break;
    case "storage":
      icon = <SvgSecurity />;
      break;
    case "fit_screen":
      icon = <SvgKubernetes />;
      break;
    default:
      icon = <SvgDocker />;
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
