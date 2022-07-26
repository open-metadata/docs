import ArrowLink from "../navigation/arrowLink";

import styles from "./newsEntry.module.css";

const NewsEntry = ({ date, title, text, link }) => {
  const niceDate = (date) => {
    let cleanDate = new Date(date);
    return cleanDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className={styles.Container}>
      <time className={styles.Date} dateTime="date">
        {niceDate(date)}
      </time>
      <a href={link}>
        <h4 className={styles.Title}>{title}</h4>
      </a>
      <p className={styles.Text}>{text}</p>
      <a href={link} className={styles.Link}>
        Read More
      </a>
    </article>
  );
};

export default NewsEntry;
