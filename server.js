import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "./schemaGQL.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path"
const app = express();
const httpServer = http.createServer(app);
const port =process.env.PORT||4000;
//mongodb+srv://dbUser:dbUserPassword@cluster0.mhxw9ma.mongodb.net/?retryWrites=true&w=majority
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("connection to db is success"))
  .catch((err) => console.log("error occured", err));

//

import "./models/quote.js";
import "./models/user.js";

import resolver from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers: resolver,
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      return { userId };
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginDrainHttpServer({ httpServer })
      : ApolloServerPluginLandingPageDisabled,
  ],
});
if(process.env.NODE_ENV==="production"){
  app.use(express.static("client/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}
await server.start();
server.applyMiddleware({ app, path: "/graphql" });
httpServer.listen({ port: port }, ()=>{
    console.log(`🚀  Server ready at ${server.graphqlPath}`);
})
// server.listen().then(({ url }) => {
  
// });
