import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoaderIcon, MoreHorizontal } from "lucide-react";
import {
  useCreateExerciseMutation,
  useDeleteExerciseMutation,
} from "@/redux/features/exercise/exerciseApi";

type ExerciseCardProps = {
  exercise: Exercise;
  refetch: any;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, refetch }) => {
  const [deleteExercise, { isLoading, isSuccess }] =
    useDeleteExerciseMutation();
  const [deletedId, setDeletedId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setDeletedId("");
    }
  }, [isSuccess]);

  const handleDelete = (id: string) => {
    deleteExercise(id);
    setDeletedId(id);
  };
  return (
    <div className=" flex flex-col gap-2  w-full">
      <Link
        href={`exercises/edit/${exercise._id}`}
        className="h-[130px] w-full relative rounded-lg "
      >
        <Image
          src={exercise?.image?.url}
          alt={exercise?.name}
          fill
          quality={100}
          //   loading="lazy"
          className=" rounded-lg w-full h-full object-cover"
        />

        {isLoading && deletedId === exercise._id ? (
          <div className=" absolute z-10  w-full h-full flex items-center justify-center bg-zinc-900/25">
            <LoaderIcon size={22} className=" text-zinc-200 animate-spin" />
          </div>
        ) : null}
      </Link>
      <div className="flex items-center justify-between ">
        <p className="truncate text-[1.1rem] capitalize">{exercise.name}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="" size={17} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100px] -translate-x-[40px]">
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => handleDelete(exercise._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default ExerciseCard;
