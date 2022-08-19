import Link from "next/link";

import styles from "./button.module.css";

const Button = ({ children, link, blueButton }) => {
  return (
    <Link href={link}>
      <button className={blueButton ? styles.blueButton : styles.Button}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
