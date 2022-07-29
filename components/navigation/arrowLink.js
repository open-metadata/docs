import Link from "next/link";

import styles from "./arrowLink.module.css";

const ArrowLink = ({ children, link, type, content }) => {
  function ArrowType() {
    if (type == "back") {
      return (
        <Link href={link}>
          <div className="prev">
            <a
              className={`
              not-link
              group
              ${styles.Link}
              ${styles.BackLink}
            `}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                style={{ marginLeft: "24px" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5771 1.42822L11.4932 0.344238C11.0342 -0.114746 10.292 -0.114746 9.83789 0.344238L0.345703 9.83154C-0.113281 10.2905 -0.113281 11.0327 0.345703 11.4868L9.83789 20.979C10.2969 21.438 11.0391 21.438 11.4932 20.979L12.5771 19.895C13.041 19.4312 13.0312 18.6743 12.5576 18.2202L6.67383 12.6147H20.707C21.3564 12.6147 21.8789 12.0923 21.8789 11.4429V9.88037C21.8789 9.23096 21.3564 8.7085 20.707 8.7085H6.67383L12.5576 3.10303C13.0361 2.64893 13.0459 1.89209 12.5771 1.42822Z"
                  fill="#AFA8BA"
                />
              </svg>

              <span className={styles.Text}>
                <span className="mr-[14px]" style={{ placeSelf: "end" }}>
                  {" "}
                  Previous:{" "}
                </span>
                <span
                  className={styles.content}
                  style={{ marginRight: "14px" }}
                >
                  {content}
                </span>
              </span>
            </a>
          </div>
        </Link>
      );
    } else if (type == "next") {
      return (
        <Link href={link}>
          <div className="next">
            <a
              className={`
              not-link
              group
              ${styles.Link}
              ${styles.NextLink}
            `}
            >
              <span className={styles.Text}>
                <span className="justify-self-start ml-[14px]">Next:</span>
                <span className={`${styles.content} ml-[14px] content`}>
                  {content}
                </span>
              </span>
              <span className="next_svg">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ marginRight: "24px" }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.30176 1.42822L10.3857 0.344238C10.8447 -0.114746 11.5869 -0.114746 12.041 0.344238L21.5332 9.83154C21.9922 10.2905 21.9922 11.0327 21.5332 11.4868L12.041 20.979C11.582 21.438 10.8398 21.438 10.3857 20.979L9.30176 19.895C8.83789 19.4312 8.84766 18.6743 9.32129 18.2202L15.2051 12.6147H1.17188C0.522461 12.6147 0 12.0923 0 11.4429V9.88037C0 9.23096 0.522461 8.7085 1.17188 8.7085H15.2051L9.32129 3.10303C8.84277 2.64893 8.83301 1.89209 9.30176 1.42822Z"
                    fill="#AFA8BA"
                  />
                </svg>
              </span>
            </a>
          </div>
        </Link>
      );
    }
  }
  return <ArrowType />;
};

export default ArrowLink;
