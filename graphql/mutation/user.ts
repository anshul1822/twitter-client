import { graphql } from "@/gql";

export const followUserMutation = graphql(`
  #graphql
  mutation FollowUser($to: String!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(`
  #graphql
  mutation UnfollowUser($to: String!) {
    unfollowUser(to: $to)
  }
`);