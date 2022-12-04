import {gql} from "@apollo/client"
export const SIGNUP_USER = gql`
  mutation createUser($newUsers: UserInput!) {
    user: signUpUser(newUser: $newUsers){
      firstName
      
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation signInUser($newUsers: UserSignIn!) {
    user: signInUser(userSign: $newUsers) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation create ($name:String!){
    createQuote(name: $name)
  }
`;