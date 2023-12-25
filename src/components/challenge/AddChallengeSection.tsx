import { cn } from "@/lib/utils";
import { CheckCircle2Icon, Minus, Plus, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

type AddChallengeSectionProps = {
  challengesData: {
    exercises: any[];
  }[];
  setChallengesData: React.Dispatch<
    React.SetStateAction<
      {
        exercises: any[];
      }[]
    >
  >;
  setExerciseList: React.Dispatch<React.SetStateAction<any[]>>;
  exerciseList: any[];
};

const AddChallengeSection: React.FC<AddChallengeSectionProps> = ({
  challengesData,
  setChallengesData,
  setExerciseList,
  exerciseList,
}) => {
  const [day, setDay] = useState<number>(1);
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const handleAddNewDay = () => {
    if (
      challengesData.length > 0 &&
      challengesData[challengesData.length - 1]?.exercises.length < 1
    ) {
      toast({ title: "Previous day workout is empty", variant: "destructive" });
      return;
    }
    setChallengesData((prev) => [...prev, { exercises: [] }]);
  };

  const handleRemoveChallengeDay = (index: number) => {
    const filteredChallengeData = challengesData.filter(
      (_, idx) => idx !== index
    );
    setChallengesData(filteredChallengeData);
  };

  const setDayExerciseList = (seletedIndex: number) => {
    const exercise = challengesData.filter(
      (_, index) => index === seletedIndex
    );
    setDay(seletedIndex + 1);
    setExerciseList(exercise[0].exercises);
  };

  const handleSetDayExercise = () => {
    const data = challengesData.map((items, index) => {
      if (index === day - 1) {
        return {
          exercises: exerciseList,
        };
      }
      return items;
    });

    setChallengesData(data);
    setDone(true);
  };

  useEffect(() => {
    const data = challengesData.map((items, index) => {
      if (index === day - 1) {
        return {
          exercises: exerciseList,
        };
      }
      return items;
    });

    setChallengesData(data);
  }, [day, exerciseList]);

  useEffect(() => {
    if (done) {
      setTimeout(() => {
        setDone(false);
      }, 1000);
    }
  }, [done]);
  return (
    <div className="px-5">
      <div className="flex flex-col justify-center  gap-7">
        <p className=" ">{challengesData.length} Workout Days</p>
        <div className="flex  flex-wrap items-center  gap-x-8 gap-y-9">
          <div
            onClick={handleAddNewDay}
            className=" border-4 bg-zinc-800  h-[45px] w-[45px] rounded-md flex items-center justify-center cursor-pointer hover:text-emerald-500 text-neutral-400 transition duration-200"
          >
            <Plus className="  text-xl" />
          </div>
          {challengesData?.map(({ exercises }, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center group"
            >
              <div
                onClick={() => setDayExerciseList(index)}
                className={cn(
                  " border-4 border-solid h-[70px] bg-zinc-900 border-transparent w-[70px] rounded-md rotate-45 flex items-center justify-center cursor-pointer  hover:text-emerald-500 text-neutral-400 transition duration-200",
                  {
                    "border-solid border-emerald-500 text-emerald-500":
                      day - 1 === index,
                  }
                )}
              >
                <div className=" text-center -rotate-45">
                  <p className=" text-base"># {index + 1}</p>
                  <p className=" text-xs text-neutral-500">
                    Total {exercises?.length}
                  </p>
                </div>
              </div>
              <div
                onClick={() => handleRemoveChallengeDay(index)}
                className=" cursor-pointer translate-y-3 group-hover:translate-y-0 hover:bg-red-800 opacity-0 group-hover:opacity-100 absolute -bottom-5 flex items-center justify-center bg-zinc-700 rounded-full h-[20px] w-[20px] p-1 transition duration-200 delay-100"
              >
                <X className=" text-white" />
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={handleSetDayExercise}
          className=" bg-zinc-800 p-2 rounded-md h-fit w-fit flex gap-2  items-center justify-center cursor-pointer hover:text-emerald-500 text-neutral-400 transition duration-200"
        >
          <p className=" text-xs text-center">Day {day}</p>

          <div className="relative flex">
            <CheckCircle2Icon
              className={cn("delay-100 absolute top-0", {
                "scale-100": done,
                "scale-0 ease-out duration-200 delay-100": !done,
              })}
            />

            <Save
              className={cn("scale-0 ease-out duration-200 top-0", {
                "scale-100": !done,
                "scale-0 ease-out duration-200": done,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddChallengeSection;
