// import {graphql} from "graphql";
import {graphql} from "../../gql";

export const getAllTweetsQuery = 
graphql(`
    #graphql
    query GetAllTweets{
        getAllTweets {
            id
            content
            imageURL
            author {
              id
              email
              firstName
              profileImage
              lastName
            }
          }
    }
`
);