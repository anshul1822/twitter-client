// import {graphql} from "graphql";
import {graphql} from "../../gql";


export const verifyUserGoogleTokenQuery = 
graphql(`
    #graphql
    query VerifyUserGoogleToken($token : String!){
        verifyGoogleToken(token: $token)
    }
`
);

export const getCurrentUserQuery = 
graphql(`
    #graphql
    query GetCurrentUser{
        getCurrentUser {
            id
            firstName
            email
            lastName
            profileImage 
            tweets{
                id
                content
                author{
                    firstName
                    lastName
                    profileImage
                }
            }
          }
    }
`
);

export const getUserByIdQuery = 
graphql(`
#graphql
query GetUserById($id: ID!) {
    getUserById(id: $id) {
      firstName
      lastName
      profileImage
      tweets {
        content
        imageURL
        author {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }

`);