"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useGetExercisesQuery } from "@/redux/features/exercise/exerciseApi";
import Image from "next/image";
import ExerciseCard from "./ExerciseCard";
type ExercisesProps = {};

const Exercises: React.FC<ExercisesProps> = () => {
  const { data, isLoading, refetch } = useGetExercisesQuery({});

  const exercises: Exercise[] = data?.exercises;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center w-full justify-between">
        <p className=" text-2xl">{exercises?.length} Exercises</p>
        <Link className={buttonVariants({})} href={"/exercises/create"}>
          Create Exercise <Plus size={16} className=" inline-block ml-2" />
        </Link>
      </div>
      <div className="mt-8">
        <div className=" grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-5">
          {exercises?.map((exercise) => (
            <ExerciseCard
              exercise={exercise}
              refetch={refetch}
              key={exercise._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Exercises;
