import React, { useState } from "react";
import { ReactComponent as SvgArrow } from "../../images/icons/arrow.svg";
import styles from "./collapse.module.css";
import classNames from "classnames";

const Collapse = ({ title, children }) => {
  const [show, setShow] = useState(false);

  return (
    <section className="py-2">
      <div className="collapse_container border border-color_violet rounded">
        <div
          className="main-heading py-2 px-2 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <summary className="flex text-[18px] pl-2 font-abold">
            {title}
            {show ? (
              <SvgArrow className="rotate-90 duration-100 text-xxl fill-color_violet self-center" />
            ) : (
              <SvgArrow className=" fill-color_violet self-center" />
            )}
          </summary>
        </div>
        {show && (
          <div className="main-heading pl-6 pb-2 flex">
            <section
              className={classNames(
                styles.Container,
                styles.collapse_Container
              )}
            >
              {children}
            </section>
          </div>
        )}
      </div>
    </section>
  );
};
export default Collapse;
