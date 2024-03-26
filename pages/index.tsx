import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { MdHomeFilled, MdOutlineNotifications, MdGroups } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { FaUser, FaImage } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Inter } from "next/font/google";
import React, { useCallback, useState } from "react";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUSer } from "@/hooks/user";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { getAllTweetsQuery, getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from 'axios';
import LoginPage from "@/components/Layout/LoginPage";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  tweets: Tweet[];
}

export default function Home(props: HomeProps) {
  // console.log('props', props);

  const { user } = useCurrentUSer();
  // const {tweets = []} = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const {tweets = props.tweets as Tweet[]} = useGetAllTweets();

  const handleInputChangeFile = useCallback( (input : HTMLInputElement) => {
    return async (event : Event) => {
      event.preventDefault();
      console.log(input.files);

      const file : File | null | undefined = input.files?.item(0);
      if(!file) return;

      const {getSignedURLForTweet} = await graphqlClient.request(getSignedURLForTweetQuery, {imageType : file.type , imageName : file.name});

      if(getSignedURLForTweet){
        //call axios to add to server
        toast.loading('Uploading....', {id : '2'});
        await axios.put(getSignedURLForTweet, file, {
          headers : {
            'Content-Type' : file.type
          }
        })
        toast.success('Upload Completed', {id : '2'});
        const url = new URL(getSignedURLForTweet);
        const myFile = `${url.origin}${url.pathname}`;
        setImageURL(myFile);
      }

    }
  }, [])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleFn = handleInputChangeFile(input);

    input.addEventListener('change', handleFn);

    input.click();

  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content: content,
      imageURL
    });
    setContent('');
    setImageURL('');
  }, [content, mutate, imageURL]);

  if(user)
{
  return (
    <>
      <TwitterLayout>
        <div>
          <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-4 hover:bg-slate-950 cursor-pointer transition-all">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-1">
                {user?.profileImage && (
                  <Image
                    className="rounded-full"
                    src={user?.profileImage}
                    alt="avatar"
                    height={50}
                    width={50}
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-sla"
                  rows={4}
                  placeholder={`What's Happening`}
                ></textarea>
                {
                  imageURL && 
                  <Image 
                  src={imageURL}
                  height={50}
                  width={100}
                  alt={'Image'}
                  />

                }
                <div className="mt-2 flex justify-between items-center">
                  <FaImage onClick={handleSelectImage} className="text-lg" />
                  <button
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] px-2 py-1 text-sm font-bold rounded-full"
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
      </TwitterLayout>
    </>
  );
}else{
  return (
    <>
    <LoginPage />
    </>
  )
}


}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {

  const id = context?.query?.id as string | undefined;

  if (!id) return { props: { tweets: [] } };

  
  const tweets = await graphqlClient.request(getAllTweetsQuery);

  return {
    props: {
      tweets: tweets?.getAllTweets as Tweet[],
    },
  };
};
