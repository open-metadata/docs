import styles from "./arrowLink.module.css";

const ArrowLinkContainer = ({ children }) => {
  return (
    <section className={`${(styles.Container, styles.prev)}`}>
      {children}
    </section>
  );
};

export default ArrowLinkContainer;
