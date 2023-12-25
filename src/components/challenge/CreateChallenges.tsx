/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import LeftChallengeSection from "./AddChallengeSection";
import RightChallengeSection from "./RightChallengeSection";
import { Crown, Loader2, LucideImage } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AddChallengeSection from "./AddChallengeSection";
import RightWorkoutForm from "../workout/RightWorkoutForm";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  useCreateChallengeMutation,
  useDeleteChallengeMutation,
  useGetChallengeQuery,
  useUpdateChallengeMutation,
} from "@/redux/features/challenge/challengeApi";
import { useRouter } from "next/navigation";

type CreateChallenges = {
  id?: String;
};

const CreateChallenges = ({ id }: CreateChallenges) => {
  const {
    data,
    isLoading: challengeLoading,
    refetch,
  } = useGetChallengeQuery(
    { id },
    {
      skip: id ? false : true,
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteChallenge, { isLoading: deleting, isSuccess: deleteSuccess }] =
    useDeleteChallengeMutation();
  const [
    updateChallenge,
    { isLoading: updating, isSuccess: updateSuccess, error: updateError },
  ] = useUpdateChallengeMutation();

  const challengeData: Challenge = data?.challenge;
  const router = useRouter();
  const [createChallenge, { isLoading, isSuccess, error }] =
    useCreateChallengeMutation();
  const { toast } = useToast();
  const [image, setImage] = useState<any>("");
  const [premium, setPremium] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState({
    title: "",
    location: "home",
  });

  const [challengesData, setChallengesData] = useState([
    {
      exercises: [] as any[],
    },
  ]);

  const [exerciseList, setExerciseList] = useState<any[]>([]);

  useEffect(() => {
    if (challengeData) {
      setImage(challengeData?.image);
      setPremium(challengeData?.premium);
      setChallengeInfo({
        location: challengeData?.location,
        title: challengeData?.title,
      });
      setChallengesData(() => {
        return challengeData.challenges.map((workouts) => ({
          exercises: workouts,
        }));
      });
    }
  }, [challengeData]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
    // gender: string
  ) => {
    const file = e.target?.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          setImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Challenge Created Successful",
      });
      router.push("/challenges");
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
    if (updateSuccess) {
      toast({
        title: "Challenge Updated Successful",
      });
      refetch();
      // router.push("/challenges");
    }
    if (deleteSuccess) {
      toast({
        title: "Challenge deleted",
      });
      router.push("/challenges");
    }
    if (updateError) {
      if ("data" in updateError) {
        const errorData = updateError as any;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorData.data.message,
        });
      }
    }
  }, [
    deleteChallenge,
    deleteSuccess,
    error,
    isSuccess,
    refetch,
    router,
    toast,
    updateError,
    updateSuccess,
  ]);

  const handleSaveChallenge = async () => {
    const challengesWorkout = challengesData.map((challenge) => {
      return challenge.exercises.map((value) => ({
        exercise_id: value.exercise_id,
        repetition: value.repetition,
        rest: value.rest,
        time_base: value.time_base,
      }));
    });
    const data = {
      ...challengeInfo,
      days: challengesWorkout.length,
      image,
      premium,
      challenges: challengesWorkout,
    };
    console.log({ data });
    let fields = [];
    if (!data.title) {
      fields.push("Challenge Title");
    }
    if (!data.location) {
      fields.push("Location");
    }
    if (data.challenges.length === 0) {
      fields.push("Challenge days");
    }
    if (!data.image) {
      fields.push("Challenge Image");
    }

    if (
      challengesData.some((challenge) => {
        return challenge.exercises.find((value) => value.repetition === 0);
      })
    ) {
      const day = exerciseList.findIndex((value) => value.repetition === 0);
      const exercise = exerciseList.filter((value) => value.repetition === 0);
      fields.push(
        `Day #${day + 1}, ${exercise[0]?.name} repetition is 0 ${
          exercise.length > 1 ? "and more" : ""
        }`
      );
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

    if (id) {
      await updateChallenge({ id, data });
    } else {
      await createChallenge({ data });
    }
  };

  const handleDelete = async () => {
    if (confirm("Press a button! \nEither Ok or Cancel") == true) {
      await deleteChallenge({ id });
    } else return;
  };

  return (
    <div className="my-8 mx-auto lg:w-[80%] md:w-[90%] w-[95%]">
      <div className="mb-4 w-full flex justify-end gap-3">
        <Button onClick={handleSaveChallenge}>
          {id ? "Update" : "Create"} Challenges{" "}
          <span>
            {isLoading || updating ? (
              <Loader2 className=" animate-spin ml-2" size={18} />
            ) : (
              " +"
            )}
          </span>
        </Button>
        {id ? (
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete Challenges{" "}
            <span>
              {deleting ? (
                <Loader2 className=" animate-spin ml-2" size={18} />
              ) : null}
            </span>
          </Button>
        ) : null}
      </div>
      <div className=" grid xl:grid-cols-[0.8fr,1fr] grid-cols-1 gap-5">
        <div>
          <div className=" space-y-6 lg:flex-[0.6]">
            <div className="flex items-center h-[300px] w-full gap-4">
              <label
                htmlFor="male"
                className=" bg-blue-900/50 w-full h-[300px] rounded-lg flex justify-center items-center gap-4 cursor-pointer hover:bg-zinc-800"
              >
                {image ? (
                  <img
                    src={typeof image === "string" ? image : image?.url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <LucideImage size={25} />
                    <p>Add Male image</p>
                  </>
                )}
              </label>
              {/* <label
              htmlFor="female"
              className=" bg-pink-900/50  w-full h-[150px] rounded-lg flex justify-center items-center gap-4 cursor-pointer hover:bg-zinc-800"
            >
              {femaleImage ? (
                <img
                  src={femaleImage}
                  alt=""
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <>
                  <LucidImage size={25} />
                  <p>Add Female image</p>
                </>
              )}
            </label> */}
            </div>
            <input
              type="file"
              hidden
              id="male"
              onChange={(e) => handleFileChange(e)}
            />
            {/* <input
            type="file"
            hidden
            id="female"
            onChange={(e) => handleFileChange(e, "female")}
          /> */}
            <div className=" space-y-6 mt-3">
              <div>
                <p className=" text-zinc-300 mb-1">Workout Title</p>
                <Input
                  placeholder="Title"
                  value={challengeInfo.title}
                  onChange={(e) =>
                    setChallengeInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
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

              <div className=" w-full">
                <p className="text-zinc-300 mb-1">Location</p>
                <Select
                  onValueChange={(value) =>
                    setChallengeInfo((prev) => ({ ...prev, location: value }))
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
        <div className="flex flex-col gap-7 ">
          <AddChallengeSection
            challengesData={challengesData}
            setChallengesData={setChallengesData}
            setExerciseList={setExerciseList}
            exerciseList={exerciseList}
          />
          <hr />
          <RightWorkoutForm
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateChallenges;
