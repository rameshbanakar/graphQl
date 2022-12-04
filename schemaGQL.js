import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [user]
    user(_id: ID!): user
    quotes: [quoteWithName]
    iquotes(by: ID!): [quote]
    myProfile: user
  }
  type quoteWithName {
    name: String
    by: Idname
  }
  type Idname {
    _id: String
    firstName: String
  }
  type user {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [quote]
  }
  type quote {
    name: String
    by: ID
  }

  type Mutation {
    signUpUser(newUser: UserInput!): user
    signInUser(userSign: UserSignIn!): Token
    createQuote(name: String!): String
  }
  type Token {
    token: String
  }
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSignIn {
    email: String!
    password: String!
  }
`;
export default typeDefs;
