import React from "react";
import styles from "./FormInput.module.css";

function FormInput({ label, type, placeholder, onChange, value, error }) {
  return (
    <div className={styles.container}>
      <label htmlFor="input" className={styles.label}>
        {label}
      </label>
      <input
        id="input"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`${styles.input} ${error && styles.invalid}`}
        autoComplete="off"
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default FormInput;
