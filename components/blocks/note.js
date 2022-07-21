import React from "react";
import classNames from "classnames";

import CalloutStyles from "./callout.module.css";
import NoteStyles from "./note.module.css";

import IconHeader from "./iconHeader";
import { ReactComponent as Pin } from "../../images/icons/pin.svg";

const Note = ({ children }) => {
  return (
    <section className={classNames(CalloutStyles.Container, NoteStyles.Note)}>
      <IconHeader
        icon={<Pin />}
        title="Note"
        background="l-blue-70"
        color="white"
      />
      {children}
    </section>
  );
};

export default Note;
