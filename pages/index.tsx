import Image from 'next/image'
import { BsTwitter } from "react-icons/bs";
import { MdHomeFilled, MdOutlineNotifications, MdGroups } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import { FaUser, FaImage } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { Inter } from 'next/font/google'
import React, { useCallback, useState } from 'react';
import FeedCard from '@/components/FeedCard';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import { graphqlClient } from '@/clients/api';
import { verifyUserGoogleTokenQuery } from '@/graphql/query/user';
import { useCurrentUSer } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from "@/components/Layout/TwitterLayout";

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  const {user} = useCurrentUSer();
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet();

  const queryClient = useQueryClient();
  const [content, setContent] = useState('');

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
  }, [])

  const handleCreateTweet = useCallback(()=> {
    mutate({
      content : content
    })
  }, [content, mutate]);


  return (
    <>
    <TwitterLayout>
    <div >

<div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-4 hover:bg-slate-950 cursor-pointer transition-all">
      <div className="grid grid-cols-12 gap-2">
          <div className="col-span-1">
              {
                user?.profileImage &&
                <Image 
                  className='rounded-full'
                src={user?.profileImage} alt="avatar"
                  height={50} width={50} />
              }
          </div>
          <div className="col-span-11">
              <textarea value={content} onChange={(e) => setContent(e.target.value)}
              className='w-full bg-transparent text-xl px-3 border-b border-sla' rows={4} placeholder={`What's Happening`}></textarea>
              <div className='mt-2 flex justify-between items-center'>  
              <FaImage  onClick={handleSelectImage} className='text-lg'/>
              <button onClick={handleCreateTweet} className='bg-[#1d9bf0] px-2 py-1 text-sm font-bold rounded-full'>Tweet</button>
              </div>
          </div>
      </div>    
</div>
    {
      tweets?.map(tweet => 
        tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null
      )
    }

</div>
    </TwitterLayout>
    
    </>
  )
}
