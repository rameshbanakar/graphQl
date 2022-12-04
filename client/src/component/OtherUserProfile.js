import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gqlQueries/query";

export default function OtherUserProfile() {
  const {userid}=useParams()
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {
      userid:userid
    },
  });
  if (loading) return <h4>Loading....</h4>;
  if (error) {
    console.log(error.message);
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
      <h4>Quotes</h4>
      {data.user.quotes.map((quote) => {
        return (
          <blockquote>
            <h6>{quote.name}</h6>
          </blockquote>
        );
      })}
    </div>
  );
}
