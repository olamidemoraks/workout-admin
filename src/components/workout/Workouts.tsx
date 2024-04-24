"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { useGetAllWorkoutQuery } from "@/redux/features/workout/workoutApi";
import WorkoutSection from "./WorkoutSection";

const Workouts = () => {
  const { data, isLoading } = useGetAllWorkoutQuery({});

  const workouts: Array<{ [key: string]: Array<any> }> = data?.workout;
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center w-full justify-between">
        <p className=" text-2xl">Workout</p>
        <Link className={buttonVariants({})} href={"/workouts/create"}>
          Create Workout <Plus size={16} className=" inline-block ml-2" />
        </Link>
      </div>
      <div className="  mt-10 flex flex-col gap-10">
        {workouts?.map((categoryWorkout, idx) => (
          <WorkoutSection
            key={idx}
            header={Object.keys(categoryWorkout)?.[0]}
            workouts={Object.values(categoryWorkout)?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Workouts;
