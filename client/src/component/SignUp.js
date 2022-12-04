import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../gqlQueries/mutations";

export default function SignUp() {
  const [formData, setFromData] = useState({});
  const [signUpUser,{data,loading,error}]=useMutation(SIGNUP_USER)

  const OnSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      variables: {
        newUsers:formData
      },
    });
  };
  const onchange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  if (loading) {
    <h5>Loading....</h5>;
  }
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="green card-panel">{data.user.firstName} is signedUp</div>
      )}

      <h4>Sign up</h4>
      <form onSubmit={OnSubmit}>
        <input
          type="text"
          placeholder="first Name"
          name="firstName"
          onChange={onchange}
          required
        />
        <input
          type="text"
          placeholder="last name"
          name="lastName"
          onChange={onchange}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={onchange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onchange}
          required
        />
        <button type="submit" className="btn purple darken-2">
          submit
        </button>
      </form>
    </div>
  );
}
