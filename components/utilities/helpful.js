import React, { useState, useEffect, useRef } from "react";
import pull from "lodash/pull";
import router, { withRouter } from "next/router";

import styles from "./helpful.module.css";

import SuggestEdits from "./suggestEdits";

const Helpful = ({ slug, sourcefile }) => {
  const formRef = useRef();
  const [step, setStep] = useState(0);
  const [isHelpful, setIsHelpful] = useState(true);
  const [feedback, setFeedback] = useState({
    other: false,
    improvements: [],
    notes: "",
    improvementsString: "",
    moreExamples: false,
    clearerSteps: false,
    moreInformation: false,
    other: false,
  });

  const handleStep = (newStep) => {
    setStep(newStep);
    if (newStep == 1) {
      setStep(1);
      setIsHelpful(false);
    }
    if (newStep == 2) {
      submitForm();
    }
  };

  const submitForm = () => {
    if (formRef && formRef.current) {
      const data = new FormData(formRef.current);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
    }
  };

  const handleOther = () => {
    setFeedback({ ...feedback, other: !feedback.other });
  };

  const handleImprovement = (e) => {
    const improvements = feedback.improvements.slice();
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (value && !improvements.includes(name)) {
      improvements.push(name);
    }

    if (!value && improvements.includes(name)) {
      pull(improvements, name);
    }

    setFeedback({
      ...feedback,
      [name]: value,
      improvements,
      improvementsString: improvements.join(","),
    });
  };

  const handleNoteChange = (event) => {
    setFeedback({ ...feedback, notes: event.target.value });
  };

  const handleRouteChange = () => {
    setFeedback({
      ...feedback,
      improvements: [],
      improvementsString: "",
    });
    setStep(0);
    setIsHelpful(true);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
  });

  let joinedSlug = "/";
  if (slug) {
    joinedSlug = `/${slug.join("/")}`;
  }

  let otherText;
  if (feedback.other) {
    otherText = (
      <textarea
        name="other-text"
        onChange={handleNoteChange}
        value={feedback.notes}
        placeholder="Please let us know how we can improve this page (optional)"
        rows="4"
        className={styles.Textarea}
      />
    );
  }

  let block;
  if (step == 0) {
    block = (
      <section className={styles.Container}>
        <p className={styles.Title}>Was this page helpful?</p>
        <section className={styles.CtaContainer}>
          <button onClick={() => handleStep(2)} className={styles.Button_green}>
            <div class="group-hover:-rotate-8 transition-fast-out w-20 h-12 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#008376"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-thumbs-up block w-full h-full bg-[00837633]"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </div>
          </button>
          <button onClick={() => handleStep(1)} className={styles.Button_red}>
            <div class="group-hover:-rotate-8 transition-fast-out w-24 h-24 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF4C3B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-thumbs-down block w-full h-full"
              >
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
              </svg>
            </div>
          </button>
        </section>
      </section>
    );
  }
  if (step == 1) {
    block = (
      <section>
        <h4 className={styles.ImproveTitle}>How can we improve this page?</h4>
        <p className={styles.ImproveText}>Select all that apply</p>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreExamples"
            name="moreExamples"
            checked={feedback.moreExamples}
          />
          <label htmlFor="more-examples" className={styles.Label}>
            More examples
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="clearerSteps"
            name="clearerSteps"
            checked={feedback.clearerSteps}
          />
          <label htmlFor="clearerSteps" className={styles.Label}>
            Clearer steps
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="moreInformation"
            name="moreInformation"
            checked={feedback.moreInformation}
          />
          <label htmlFor="moreInformation" className={styles.Label}>
            More information
          </label>
          <br />
        </div>
        <div className={styles.InputContainer}>
          <input
            className={styles.Input}
            onChange={(e) => handleImprovement(e)}
            type="checkbox"
            id="other"
            name="other"
            checked={feedback.other}
          />
          <label htmlFor="other" className={styles.Label}>
            Other
          </label>
          <br />
        </div>
        {otherText}
        <button onClick={() => handleStep(2)} className={styles.SubmitCTA}>
          Submit
        </button>
      </section>
    );
  }
  if (step == 2) {
    block = (
      <section>
        <p className={styles.Title}>Thank you for your feedback!</p>
      </section>
    );
  }

  return (
    <section className={styles.FormContainer}>
      <form
        name="helpful"
        method="POST"
        data-netlify="true"
        ref={formRef}
        data-netlify-honeypot="bot-field"
        className={styles.Form}
      >
        <input type="hidden" name="form-name" value="helpful" />
        <input type="hidden" name="url" value={joinedSlug} />
        <input type="hidden" name="was_helpful" value={isHelpful} />
        <input
          type="hidden"
          name="improvements"
          value={feedback.improvementsString}
        />
        <input type="hidden" name="notes" value={feedback.notes} />
        {block}
      </form>
      <SuggestEdits sourcefile={sourcefile ? sourcefile : ""} />
    </section>
  );
};

export default Helpful;
