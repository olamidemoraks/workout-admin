/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowRight,
  CameraIcon,
  DumbbellIcon,
  HomeIcon,
  Loader2Icon,
  SwitchCameraIcon,
  UploadCloud,
} from "lucide-react";
import { useForm, ResolverOptions } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { useCreateExerciseMutation } from "@/redux/features/exercise/exerciseApi";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CreateExerciseProps = {};

const focus = [
  { title: "abs", imageUrl: "/assets/groups/abs.png" },
  { title: "chest", imageUrl: "/assets/groups/chest.png" },
  { title: "back", imageUrl: "/assets/groups/back.webp" },
  { title: "traps", imageUrl: "/assets/groups/traps.png" },
  { title: "shoulders", imageUrl: "/assets/groups/shoulder.webp" },
  { title: "biceps", imageUrl: "/assets/groups/arms.webp" },
  { title: "triceps", imageUrl: "/assets/groups/triceps.webp" },
  { title: "forearms", imageUrl: "/assets/groups/arms.webp" },
  { title: "calves", imageUrl: "/assets/groups/calves.png " },
  { title: "hamstrings", imageUrl: "/assets/groups/hamstrings.webp" },
  { title: "quads", imageUrl: "/assets/groups/quads1.webp" },
  { title: "glutes", imageUrl: "/assets/groups/glutes.webp" },
];

const CreateExercise: React.FC<CreateExerciseProps> = () => {
  const [createExercise, { isLoading, isSuccess, error }] =
    useCreateExerciseMutation({});
  const router = useRouter();
  const { toast } = useToast();

  const [maleImage, setMaleImage] = useState<any>("");
  const [femaleImage, setFemaleImage] = useState<any>("");
  const [focusPoint, setFocusPoint] = useState<string[]>([]);
  const schema = yup.object({
    name: yup.string(),
    tips: yup.string(),
    equipment: yup.string(),
    location: yup.string(),
    body_part: yup.string(),
    focus: yup.string(),
  });

  type TCustomFormValidator = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TCustomFormValidator>({
    defaultValues: {
      name: "",
      tips: "",
      equipment: "",
      location: "",
      // focus: "",
      // body_part: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSuccess) {
      // router.push("/exercises");
      reset();
      setMaleImage("");
      setFemaleImage("");
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
  }, [error, isSuccess, reset, router, toast]);

  const handleSelectMuscle = (group: string) => {
    setFocusPoint((prev) => {
      if (prev.includes(group)) {
        return prev.filter((item) => item !== group);
      } else {
        return [...prev, group];
      }
    });
  };

  const handleSubmitWorkout = (values: any) => {
    const data = {
      ...values,
      image: maleImage,
      female_image: femaleImage,
      focus: focusPoint,
    };
    createExercise(data);
  };

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
            ? setMaleImage(fileReader.result)
            : setFemaleImage(fileReader.result);
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className=" rounded-xl w-full my-6">
      <form onSubmit={handleSubmit(handleSubmitWorkout)}>
        <div className=" md:grid md:grid-cols-2 md:space-x-8 md:items-start flex flex-col-reverse items-center md:gap-0 gap-4 ">
          <div className=" space-y-4 w-full">
            <Input
              {...register("name", { required: true })}
              placeholder="Exercise Name"
              className={cn("focus:outline-none", {
                "border-red-500": errors.name,
              })}
            />
            <Textarea
              {...register("tips", { required: true })}
              placeholder="Exercise Tips"
              className={cn("focus:outline-none resize-none", {
                "border-red-500": errors.tips,
              })}
            />

            <Input
              {...register("equipment")}
              placeholder="Equipments"
              className={cn(" focus:outline-none ")}
            />
            {watch("equipment") && (
              <div className="flex gap-2 flex-wrap">
                {watch("equipment")
                  ?.split(" ")
                  .join(",")
                  ?.split(",")
                  .map((part, index) => (
                    <>
                      {part && (
                        <p
                          key={index}
                          className="px-2 py-[2px] text-xs rounded-xl bg-orange-700 text-white capitalize"
                        >
                          {part}
                        </p>
                      )}
                    </>
                  ))}
              </div>
            )}
            <div className="grid grid-cols-4 gap-2">
              {focus.map((group, index) => (
                <div
                  onClick={() => handleSelectMuscle(group.title)}
                  className={cn(
                    "h-[4.5rem] w-[4.5rem] relative flex items-center justify-center cursor-pointer rounded",
                    {
                      "ring-2 ring-white/70 ": focusPoint.includes(group.title),
                    }
                  )}
                  key={index}
                >
                  <Image
                    src={`${group.imageUrl}`}
                    alt={`${group.title}`}
                    fill
                    className=" h-full w-full rounded-md absolute brightness-75"
                  />
                  <p className={cn(" font-semibold capitalize z-10 absolute ")}>
                    {group.title}
                  </p>
                </div>
              ))}
            </div>

            {/* If you are finding it hard, place your foot on the floor and perform this on both sides */}
            <div className=" ">
              {/* <Select onValueChange={(value) => setValue("focus", value)}>
                <SelectTrigger
                  className={cn("w-full", {
                    "border-red-500": errors.focus,
                  })}
                >
                  <SelectValue placeholder="Focus Point" />
                </SelectTrigger>
                <SelectContent>
                  {focus.map((item) => (
                    <SelectItem
                      value={item.title}
                      key={item.title}
                      className=" capitalize"
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <Select onValueChange={(value) => setValue("location", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="flex items-center gap-2" value="home">
                    Home
                  </SelectItem>
                  <SelectItem className="flex items-center gap-2" value="gym">
                    Gym
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSubmit(handleSubmitWorkout)}
              disabled={femaleImage && maleImage ? false : true}
              className=" disabled:cursor-not-allowed"
            >
              {!isLoading ? (
                <>
                  {" "}
                  Submit Exercise <ArrowRight size={17} className="ml-2" />
                </>
              ) : (
                <>
                  Submitting...{" "}
                  <Loader2Icon className=" animate-spin" size={17} />
                </>
              )}
            </Button>
          </div>
          <div className="w-full h-[350px] flex gap-4  rounded-xl relative">
            <>
              {!maleImage ? (
                <label
                  htmlFor="male"
                  className="flex items-center justify-center flex-col gap-3 h-full w-full cursor-pointer hover:bg-zinc-800   bg-blue-900/50 rounded-xl "
                >
                  <UploadCloud className="" size={30} />
                  <p className=" text-zinc-200 text-lg">Male Preview</p>
                  <p className=" text-sm text-zinc-300">Click to browse</p>
                </label>
              ) : (
                <div className=" w-full h-full relative">
                  <img
                    src={maleImage}
                    className=" w-full h-full rounded-xl object-cover"
                    alt="Preview workout image"
                  />
                  <label
                    htmlFor="male"
                    className=" absolute bottom-3 right-4 z-40 bg-zinc-800 rounded-full p-2 hover:bg-gradient-to-tr hover:from-cyan-500 cursor-pointer hover:via-blue-600 hover:to-blue-600 "
                  >
                    <SwitchCameraIcon />
                  </label>
                </div>
              )}

              {!femaleImage ? (
                <label
                  htmlFor="female"
                  className="flex items-center justify-center flex-col gap-3 h-full w-full cursor-pointer hover:bg-zinc-800  bg-pink-900/50 rounded-xl "
                >
                  <UploadCloud className="" size={30} />
                  <p className=" text-zinc-200 text-lg">Female Preview</p>
                  <p className=" text-sm text-zinc-300">Click to browse</p>
                </label>
              ) : (
                <div className=" w-full h-full relative">
                  <img
                    src={femaleImage}
                    className=" w-full h-full rounded-xl object-cover"
                    alt="Preview workout image"
                  />
                  <label
                    htmlFor="female"
                    className=" absolute bottom-3 right-4 z-40 bg-zinc-800 rounded-full p-2 hover:bg-gradient-to-tr hover:from-purple-500 cursor-pointer hover:via-indigo-600 hover:to-indigo-600 "
                  >
                    <SwitchCameraIcon />
                  </label>
                </div>
              )}
            </>

            <input
              accept="image/*"
              type="file"
              className=" hidden"
              id="male"
              onChange={(e) => handleFileChange(e, "male")}
            />
            <input
              accept="image/*"
              type="file"
              className=" hidden"
              id="female"
              onChange={(e) => handleFileChange(e, "female")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateExercise;
