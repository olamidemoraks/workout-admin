"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";
import { useGetAllChallengeQuery } from "@/redux/features/challenge/challengeApi";
import ChallengeCard from "./ChallengeCard";

const Challenges = () => {
  const { data, isLoading } = useGetAllChallengeQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const challenges: Challenge[] = data?.challenges;

  console.log(challenges);
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center w-full justify-between">
        <p className=" text-2xl">{challenges?.length} Challenges</p>
        <Link className={buttonVariants({})} href={"/challenges/create"}>
          Create Challenge <Plus size={16} className=" inline-block ml-2" />
        </Link>
      </div>
      <div className="mt-8">
        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5">
          {challenges?.map((challenge) => (
            <Link
              href={`/challenges/edit/${challenge?._id}`}
              key={challenge?._id}
            >
              <ChallengeCard challenge={challenge} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
