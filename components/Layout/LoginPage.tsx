import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUSer } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { user } = useCurrentUSer();
  const queryClient = useQueryClient();

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
    //   toast.success("Successfully toasted!");
    //   console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries([
        "current-user",
      ] as InvalidateQueryFilters);
    },
    []
  );

  return (
    <>
      <>
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
          <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
            <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 text-center sm:px-16">
              <p className="text-sm text-gray-500">
                Use your Google Account to to sign in
              </p>
            </div>
            <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
              <div>
                <div className="lg:inline lg:col-span-3">
                  {!user && (
                    <div className=" flex flex-col items-center border p-5 bg-slate-700 rounded-lg">
                      <h1 className="mb-5">New To Twitter?</h1>
                      <GoogleLogin onSuccess={handleLoginWithGoogle}/>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-center text-sm text-gray-600">
                Don't have an account? Sign up for free.
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LoginPage;
