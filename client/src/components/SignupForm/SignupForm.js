import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions/session_actions";
import FormButton from "../FormButton/FormButton";
import FormInput from "../FormInput/FormInput";
import styles from "./SignupForm.module.css";

const SignupForm = ({ signup, errors }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      name,
      email,
      password,
      password2
    };

    signup(user);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormInput
          type="text"
          label="Username"
          placeholder="Enter name"
          onChange={e => setName(e.target.value)}
          value={name}
          error={errors.name}
        />
        <FormInput
          type="text"
          label="Email address"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          error={errors.email}
        />
        <FormInput
          type="password"
          label="Password"
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          error={errors.password}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          placeholder="Enter password"
          onChange={e => setPassword2(e.target.value)}
          value={password2}
          error={errors.password2}
        />
        <FormButton text="Submit" color="blue" />
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignupForm));
