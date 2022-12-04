import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROFILE } from "../gqlQueries/query";
import {useNavigate} from "react-router-dom"
export default function Profile() {
  const navigate=useNavigate();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    refetchQueries: ["getProfile", "getAllQuery"],
  });
  if(loading) return <h4>Loading....</h4>;
  if(error){
    console.log(error.message)
  }
  if(!localStorage.getItem("token")){
    navigate("/login")
  }
  //const { firstName, lastName, email, quotes } = data.user;
  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ marginTop: "10px", border: "2px solid black" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5>
          {data.user.firstName}
          {data.user.lastName}
        </h5>
        <h5>Email-{data.user.email}</h5>
      </div>
      <h4>Your Quotes</h4>
      {
        data.user.quotes.map(quote=>{
          return (
            <blockquote>
              <h6>{quote.name}</h6>
            </blockquote>
          );
        })
      }
    </div>
  );
}
