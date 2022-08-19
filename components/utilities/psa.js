import styles from "./psa.module.css";
import { ReactComponent as Chat } from "../../images/icons/chat.svg";

const Psa = () => {
  return (
    <section className={styles.Container}>
      <Chat className={styles.Icon} />
      <article>
        <h3 className={styles.Title}>Still have questions?</h3>

        <p className={styles.Text}>
          You can take a look at our{" "}
          <a
            href="https://github.com/open-metadata/OpenMetadata/discussions/categories/q-a"
            target="_blank"
            className={styles.Link}
          >
            Q&A
          </a>{" "}
          or reach out to us in{" "}
          <a
            href="https://slack.open-metadata.org/"
            target="_blank"
            className={styles.Link}
          >
            Slack
          </a>{" "}
        </p>
      </article>
    </section>
  );
};

export default Psa;
