import React from "react";
import styles from "./FormButton.module.css";

function FormButton({ text, color }) {
  return (
    <button
      type="submit"
      className={`${styles.button} ${
        color === "blue" ? styles.blue : styles.grey
      }`}
    >
      {text}
    </button>
  );
}

export default FormButton;
