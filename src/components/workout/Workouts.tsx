"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { useGetAllWorkoutQuery } from "@/redux/features/workout/workoutApi";
import WorkoutCard from "./WorkoutCard";

const Workouts = () => {
  const { data, isLoading } = useGetAllWorkoutQuery({});

  const workouts: Workout[] = data?.workouts;
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center w-full justify-between">
        <p className=" text-2xl">{workouts?.length} Workout</p>
        <Link className={buttonVariants({})} href={"/workouts/create"}>
          Create Workout <Plus size={16} className=" inline-block ml-2" />
        </Link>
      </div>
      <div className="mt-8">
        <div className=" grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5">
          {workouts?.map((workout) => (
            <Link href={`/workouts/edit/${workout._id}`} key={workout._id}>
              <WorkoutCard workout={workout} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
