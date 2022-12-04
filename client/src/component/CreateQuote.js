import { useMutation } from "@apollo/client";
import React ,{useState} from "react";
import { CREATE_QUOTE } from "../gqlQueries/mutations";
import {GET_ALL_QUOTES} from "../gqlQueries/query"
export default function CreateQuote() {
    const [quote,setQuote]=useState("")
   const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
     refetchQueries: [GET_ALL_QUOTES, "getAllQuery"],
   });
    const onsubmit=(e)=>{
       e.preventDefault()
       createQuote({
        variables:{
          name:quote
        }
       })
    }
    if (loading) {
      <h5>Loading....</h5>;
    }
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <form onSubmit={onsubmit}>
        <input
          type="text"
          name="quote"
          value={quote}
          placeholder="write your quote here"
          onChange={(e) => setQuote(e.target.value)}
        />
        <button type="submit" className="btn">
          add
        </button>
      </form>
      {data && data.createQuote && (
        <div className="green card-panel">{data.createQuote}</div>
      )}
    </div>
  );
}
