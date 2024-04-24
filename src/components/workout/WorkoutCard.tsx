import { Clock4Icon, Crown, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import { difficulty } from "./CreateWorkout";
import { cn } from "@/lib/utils";
import Link from "next/link";

type WorkoutCardProps = {
  workout: Workout;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`workouts/edit/${workout?._id}`}
      className="relative h-[200px] cursor-pointer"
    >
      <div className="w-full h-[200px]">
        <Image
          src={workout?.image.url}
          alt={workout?.name}
          fill
          className="object-cover rounded-lg "
        />
        <div className="bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent h-[60%] absolute bottom-0 w-full rounded-b-lg px-5 pb-3 flex items-end justify-between">
          <div>
            <p className=" text-xl">
              {workout?.name}{" "}
              <span className=" text-sm text-zinc-400 capitalize">
                / {workout?.location}
              </span>
            </p>
            <p className=" text-zinc-300 flex items-center gap-2">
              <Clock4Icon /> {workout?.estimate_time} min
            </p>
          </div>
          <div>
            <div className="flex gap-[2px]">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <Zap
                    key={idx}
                    size={16}
                    className={cn(" fill-zinc-600 text-zinc-600", {
                      "fill-emerald-500 text-emerald-500":
                        idx < workout?.difficult_level,
                    })}
                  />
                ))}
            </div>

            <div></div>
          </div>
        </div>
        <div className="absolute top-3 right-4">
          <Crown
            className={cn({
              " fill-yellow-500 text-yellow-500": workout?.premium,
              " fill-zinc-500 text-zinc-500 hidden": !workout?.premium,
            })}
            size={18}
          />
        </div>
      </div>
    </Link>
  );
};
export default WorkoutCard;
