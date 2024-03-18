import { graphqlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { InvalidateQueryFilters, useMutation, useQuery } from "@tanstack/react-query"
import { useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast"

export const useCreateTweet = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn : (payload : CreateTweetData) => graphqlClient.request(createTweetMutation, {payload}),
        onMutate : () => toast.loading('Creating Tweet', {id : "1"}),
        onSuccess : async() => {
            await queryClient.invalidateQueries(["all-tweets"] as InvalidateQueryFilters)
            toast.success("Created Success", {id : '1'});
        }
    })

    return mutation;
}

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey : ['all-tweets'],
        queryFn : () => graphqlClient.request(getAllTweetsQuery)
    })

    return {...query, tweets : query.data?.getAllTweets}
}