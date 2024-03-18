import Image from "next/image";
import { graphqlClient } from "@/clients/api";
import { Tweet } from "@/gql/graphql";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useGetAllTweets, useCreateTweet } from "@/hooks/tweet";
import { useCurrentUSer } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BsTwitter } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaImage } from "react-icons/fa6";
import { MdGroups, MdHomeFilled, MdOutlineNotifications } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiMessages } from "react-icons/ti";
import FeedCard from "../FeedCard";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}



const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUSer();

  const queryClient = useQueryClient();

  const sideBarMenuItems : TwitterSideBarButton[] = useMemo(() => 
    [
        {
          title: "Home",
          icon: <MdHomeFilled />,
          link :'/'
        },
        {
          title: "Explore",
          icon: <CiSearch />,
          link :'/'
        },
        {
          title: "Notifications",
          icon: <MdOutlineNotifications />,
          link :'/'
        },
        {
          title: "Messages",
          icon: <TiMessages />,
          link :'/'
        },
        {
          title: "Communities",
          icon: <MdGroups />,
          link :'/'
        },
        {
          title: "Profile",
          icon: <FaUser />,
          link :`/${user?.id}`
        },
        {
          title: "More",
          icon: <RxHamburgerMenu />,
          link :'/'
        },
      ]
  ,[user?.id]);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      console.log(googleToken);
      if (!googleToken) return toast.error("Google token not found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("User Verified");
      toast.success("Successfully toasted!");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"] as InvalidateQueryFilters);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen py-2 max-w-screen-xl mx-auto">
        <div className="col-span-2 lg:col-span-3 flex flex-col gap-3 justify-start px-4">
          <div className="text-xl lg:text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-all">
            <BsTwitter fill="white" />
          </div>
          <div>
            <ul className="text-xl mt-1 font-semibold gap-3">
              {sideBarMenuItems.map((item) => (
                <li
                  key={item.title}
                >
                  
                  <Link   href={item.link} className="flex justify-start items-center w-fit gap-4 my-2 p-2 hover:bg-gray-600 rounded-md cursor-pointer transition-all">
                  <span className="text-xl lg:text-3xl">{item.icon}</span>
                  <span className="hidden lg:inline">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden lg:inline lg:mt-8 lg:pr-10">
              <button className="bg-[#1d9bf0] w-full p-2 text-lg font-bold rounded-full">
                Tweet
              </button>
            </div>
          </div>
          {user && user.profileImage && (
            <div className="absolute bottom-5">
              <div className="flex gap-2 items-center bg-slate-700 rounded-full">
                <Image
                  src={user.profileImage}
                  alt="profilePicture"
                  height={40}
                  width={40}
                  className="lg:w-14 lg:h-14 rounded-full"
                />
                <div className="hidden lg:inline w-48 max-w-52 overflow-auto">
                  <div className="text-lg">
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 lg:col-span-6 border-r-[1px] border-l-[1px] border-slate-800 h-screen overflow-scroll custom-scrollbar">
        <div className="lg:hidden">
                {!user && (
                  <div className="border p-5 bg-slate-700 rounded-lg">
                    <h1>New To Twitter?</h1>
                    <GoogleLogin onSuccess={handleLoginWithGoogle} />
                  </div>
                )}
              </div>
          {props.children}
        </div>

        <div className="hidden lg:inline lg:col-span-3">
          {!user && (
            <div className="border p-5 bg-slate-700 rounded-lg">
              <h1>New To Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
