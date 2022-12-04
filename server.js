import mongoose from "mongoose"
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./schemaGQL.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import express from "express";
import http from "http";
 const app = express();
 const httpServer = http.createServer(app);
//mongodb+srv://dbUser:dbUserPassword@cluster0.mhxw9ma.mongodb.net/?retryWrites=true&w=majority
if(process.env.NODE_ENV!=='production'){
  dotenv.config();
}

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connection to db issuccess"))
  .catch((err) => console.log("error occured", err));

//

import "./models/quote.js"
import "./models/user.js"

import resolver from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  context:({req})=>{
    const {authorization}=req.headers;
    if(authorization){
      const {userId}=jwt.verify(authorization,process.env.JWT_SECRET)
      return {userId}
    }

  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
