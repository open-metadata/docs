import React from "react";
import classNames from "classnames";

import IconHeader from "../blocks/iconHeader";
import { ReactComponent as Star } from "../../images/icons/star_vector.svg";

import CalloutStyles from "./callout.module.css";
import TipStyles from "./tip.module.css";

const Tip = ({ children }) => {
  return (
    <section className={classNames(CalloutStyles.Container, TipStyles.Tip)}>
      <IconHeader
        icon={<Star />}
        rotate="0"
        title="Tip"
        background="pink"
        color="white"
      />
      {children}
    </section>
  );
};

export default Tip;
