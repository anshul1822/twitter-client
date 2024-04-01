import { GraphQLClient } from "graphql-request";

const isClient = typeof window != 'undefined';

export const graphqlClient = new GraphQLClient('https://d157vp43bs68b0.cloudfront.net/graphql', {
    headers: () => ({
        Authorization : isClient ? `Bearer ${window.localStorage.getItem('twitter_token')}` : 'undefined'
    })
});