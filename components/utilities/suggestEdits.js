import styles from "./suggestEdits.module.css";

const SuggestEdits = ({ sourcefile }) => {
  return (
    <section>
      <section className={styles.Container}>
        <i className={styles.Icon}>edit</i>
        <a
          className={styles.Link}
          href="https://github.com/open-metadata/OpenMetadata/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suggest edits
        </a>
      </section>
    </section>
  );
};

export default SuggestEdits;
