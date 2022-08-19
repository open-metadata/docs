import React from "react";
import styles from "./table.module.css";

const Table = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Table;
