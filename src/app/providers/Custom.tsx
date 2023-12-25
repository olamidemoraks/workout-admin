"use client";
import { useGetUserInfoQuery } from "@/redux/features/api/apiSlice";
import { Loader2 } from "lucide-react";

const Custom = ({ children }: React.PropsWithChildren) => {
  const { isLoading } = useGetUserInfoQuery({});

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className=" text-3xl text-white animate-spin" />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Custom;
