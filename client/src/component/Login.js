import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIGNIN_USER } from "../gqlQueries/mutations";
export default function Login() {
  const [formData, setFromdata] = useState({});
  const navigation = useNavigate();
  const [signinUser, { error, loading, data }] = useMutation(SIGNIN_USER);
  const OnSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        newUsers: formData,
      },
    });
    
  };
  if(data){
    localStorage.setItem("token",data.user.token)
    navigation("/");
  }
  const onchange = (e) => {
    setFromdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  if (loading) {
    <h5>Loading....</h5>;
  }
  return (
    <div className="container my-container">
      <h4>Log In</h4>
      {error && <div className="red card-panel">{error.message}</div>}
      <form onSubmit={OnSubmit}>
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
          LogIn
        </button>
      </form>
    </div>
  );
}
