/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import LeftWorkoutForm from "@/components/workout/LeftWorkoutForm";
import RightWorkoutForm from "@/components/workout/RightWorkoutForm";
import { cn } from "@/lib/utils";
import {
  Activity,
  Crown,
  Loader2,
  Image as LucidImage,
  XCircleIcon,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  useDeleteWorkoutMutation,
  useEditWorkoutMutation,
  useGetAllWorkoutQuery,
  useGetWorkoutQuery,
} from "@/redux/features/workout/workoutApi";
import { useRouter } from "next/navigation";
import { object } from "yup";

type CreateWorkoutProps = {
  id: string;
};

export const difficulty: any = {
  None: 0,
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};
const CreateWorkout: React.FC<CreateWorkoutProps> = ({ id }) => {
  const { data } = useGetWorkoutQuery({ id });
  const { refetch } = useGetAllWorkoutQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteWorkout, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteWorkoutMutation();
  const workout: Workout = data?.workout;
  const [updateWorkout, { isLoading, isSuccess, error }] =
    useEditWorkoutMutation();
  const router = useRouter();
  const [image, setImage] = useState<any>("");
  const [femaleImage, setFemaleImage] = useState<any>("");
  const [level, setLevel] = useState<number>(1);

  const [premium, setPremium] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({
    name: "",
    location: "",
    estimate_time: 0,
  });
  const [exerciseList, setExerciseList] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setImage(workout.image);
      setFemaleImage(workout.female_image);
      setLevel(workout.difficult_level);
      setPremium(workout.premium);
      setWorkoutInfo({
        estimate_time: workout.estimate_time,
        location: workout.location,
        name: workout.name,
      });
      setExerciseList(workout.exercises);
      // const exercises =
    }
  }, [data, workout]);

  const workoutData = {
    name: workoutInfo.name,
    location: workoutInfo.location,
    estimate_time: workoutInfo.estimate_time,
    difficult_level: level,
    premium: premium,
    image: image,
    exercises: exerciseList.map((exercise) => ({
      exercise_id: exercise.exercise_id,
      time_base: exercise.time_base,
      repetition: exercise.repetition,
      rest: exercise.rest,
    })),
  };

  const { toast } = useToast();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    gender: string
  ) => {
    const file = e.target?.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          gender === "male"
            ? setImage(fileReader.result)
            : setFemaleImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Workout Updated Successful",
      });
      refetch();
      router.push("/workouts");
    }
    if (isDeleted) {
      toast({
        title: "Workout Deleted Successful",
      });
      refetch();
      router.push("/workouts");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorData.data.message,
        });
      }
    }
  }, [error, isSuccess, router, toast, isDeleted]);

  const handleSubmitWorkout = () => {
    let fields = [];
    if (!workoutData.name) {
      fields.push("Workout Title");
    }
    if (!workoutData.image) {
      fields.push("Image");
    }
    if (workoutData.estimate_time === 0) {
      fields.push("Estimate time");
    }
    if (!workoutData.location) {
      fields.push("Location");
    }
    if (workoutData.exercises.length === 0) {
      fields.push("Exercise");
    }
    if (exerciseList.find((value) => value.repetition === 0)) {
      const workout: any = exerciseList.find((value) => value.repetition === 0);
      console.log(workout.name);
      fields.push(workout.name);
    }

    if (fields.length > 0) {
      console.log(fields);
      toast({
        variant: "destructive",
        title: "Please provide all fields for",
        description: `${fields.join(", ")}`,
      });

      return;
    }

    updateWorkout({ values: workoutData, id });
  };

  return (
    <>
      <div className="w-[85%] flex items-center justify-end gap-4 my-5 mx-auto">
        <Button onClick={handleSubmitWorkout}>
          Update Workout{" "}
          {isLoading ? (
            <Loader2 className="ml-2 animate-spin" size={17} />
          ) : (
            <Activity className="ml-2" size={17} />
          )}
        </Button>
        <Button onClick={() => deleteWorkout({ id })} variant={"destructive"}>
          Delete Workout{" "}
          {isDeleting ? (
            <Loader2 className="ml-2 animate-spin" size={17} />
          ) : (
            <XCircleIcon className="ml-2" size={17} />
          )}
        </Button>
      </div>
      {/* grid grid-cols-[0.8fr,1fr] */}
      <div className="lg:w-[90%] w-[95%] mx-auto flex lg:flex-row flex-col lg:gap-0 gap-10 min-h-[calc(100vh-450px)] my-6">
        {/* left section */}

        <div className="px-12  space-y-6 lg:flex-[0.6]">
          <div className="flex flex-col items-center w-full gap-4">
            <label
              htmlFor="male"
              className=" bg-blue-900/50 w-full h-[150px] rounded-lg flex justify-center items-center gap-4 cursor-pointer hover:bg-zinc-800"
            >
              {image ? (
                <img
                  src={typeof image === "object" ? image.url : image}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <LucidImage size={25} />
                  <p>Add Male image</p>
                </>
              )}
            </label>
            <label
              htmlFor="female"
              className=" bg-pink-900/50  w-full h-[150px] rounded-lg flex justify-center items-center gap-4 cursor-pointer hover:bg-zinc-800"
            >
              {femaleImage?.url == undefined || !femaleImage ? (
                <>
                  <LucidImage size={25} />
                  <p>Add Female image</p>
                </>
              ) : (
                <img
                  src={
                    typeof femaleImage === "object"
                      ? femaleImage.url
                      : femaleImage
                  }
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </label>
          </div>
          <input
            type="file"
            hidden
            id="male"
            onChange={(e) => handleFileChange(e, "male")}
          />
          <input
            type="file"
            hidden
            id="female"
            onChange={(e) => handleFileChange(e, "female")}
          />
          <div className=" space-y-6 mt-3">
            <div>
              <p className=" text-zinc-300 mb-1">Workout Title</p>
              <Input
                placeholder="Title"
                value={workoutInfo.name}
                onChange={(e) =>
                  setWorkoutInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <p className=" text-zinc-300 mb-1">Levels</p>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(difficulty).map((value) => (
                  <div
                    className={cn(
                      " bg-zinc-900 p-3 rounded-md text-sm flex gap-3 items-center cursor-pointer hover:bg-zinc-800",
                      {
                        " border-4 border-emerald-500":
                          difficulty[value] === level,
                      }
                    )}
                    key={value}
                    onClick={() => {
                      setLevel(difficulty[value]);
                    }}
                  >
                    {value}{" "}
                    <div className="flex gap-[2px]">
                      {Array(3)
                        .fill(0)
                        .map((_, idx) => (
                          <Zap
                            key={idx}
                            size={12}
                            className={cn(" fill-zinc-600 text-zinc-600", {
                              "fill-emerald-500 text-emerald-500":
                                idx < difficulty[value],
                            })}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className=" text-zinc-300 mb-1">Premium</p>
              <div className="flex gap-2">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md text-sm bg-zinc-900 p-3 cursor-pointer hover:bg-zinc-800",
                    { " border-4 border-emerald-500": !premium }
                  )}
                  onClick={() => setPremium(false)}
                >
                  Freemium{" "}
                  <Crown className=" fill-zinc-600 text-zinc-600" size={16} />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-md text-sm bg-zinc-900 p-3 cursor-pointer hover:bg-zinc-800",
                    { " border-4 border-emerald-500": premium }
                  )}
                  onClick={() => setPremium(true)}
                >
                  Premium{" "}
                  <Crown
                    className=" fill-yellow-500 text-yellow-500"
                    size={16}
                  />
                </div>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col w-full sm:gap-3 gap-12 ">
              <div className="">
                <p className=" text-zinc-300 mb-1">Estimated Time</p>
                <div className="relative sm:w-[200px]">
                  <Input
                    className="sm:w-[200px] absolute"
                    placeholder="00"
                    value={workoutInfo.estimate_time}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        return;
                      }
                      setWorkoutInfo((prev) => ({
                        ...prev,
                        estimate_time: Number(e.target.value),
                      }));
                    }}
                  />
                  <span className="absolute right-2  bg-zinc-800 top-[.4rem] p-[1.5px] px-2 rounded-sm">
                    /min
                  </span>
                </div>
              </div>

              <div className=" w-full">
                <p className="text-zinc-300 mb-1">Location</p>
                <Select
                  onValueChange={(value) =>
                    setWorkoutInfo((prev) => ({ ...prev, location: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      className="flex items-center gap-2"
                      value="home"
                    >
                      Home
                    </SelectItem>
                    <SelectItem className="flex items-center gap-2" value="gym">
                      Gym
                    </SelectItem>
                    <SelectItem
                      className="flex items-center gap-2"
                      value="anywhere"
                    >
                      Anywhere
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="lg:border-l border-zinc-800 pl-4 lg:flex-1">
          <RightWorkoutForm
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </div>
      </div>
    </>
  );
};
export default CreateWorkout;
