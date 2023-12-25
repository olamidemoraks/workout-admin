import { CalendarHeart, Crown } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

type ChallengeCardProps = {
  challenge: Challenge;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <div className="relative h-[200px]">
      <div className="w-full h-[200px]">
        <Image
          src={challenge?.image.url}
          alt={challenge?.title}
          fill
          className="object-cover rounded-lg "
        />
        <div className="bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent h-[60%] absolute bottom-0 w-full rounded-b-lg px-5 pb-3 flex items-end justify-between">
          <div>
            <p className=" text-xl">
              {challenge?.title}{" "}
              <span className=" text-sm text-zinc-400 capitalize">
                / {challenge?.location}
              </span>
            </p>
            <p className=" text-zinc-300 flex items-center gap-2">
              <CalendarHeart /> {challenge?.days} days
            </p>
          </div>
        </div>
        <div className="absolute top-3 right-4">
          <Crown
            className={cn({
              " fill-yellow-500 text-yellow-500": challenge?.premium,
              " fill-zinc-500 text-zinc-500 hidden": !challenge?.premium,
            })}
            size={18}
          />
        </div>
      </div>
    </div>
  );
};
export default ChallengeCard;
