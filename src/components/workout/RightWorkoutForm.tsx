"use client";
import { useGetExercisesQuery } from "@/redux/features/exercise/exerciseApi";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Grip,
  Plus,
  Timer,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  Active,
  closestCenter,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { DropAnimation } from "@dnd-kit/core";

import { Skeleton } from "../ui/skeleton";
const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

type RightWorkoutFormProps = {
  exerciseList: any[];
  setExerciseList: React.Dispatch<React.SetStateAction<any[]>>;
};

const RightWorkoutForm: React.FC<RightWorkoutFormProps> = ({
  exerciseList,
  setExerciseList,
}) => {
  const { data, isLoading } = useGetExercisesQuery({});

  const [active, setActive] = useState<Active | null>(null);
  const [isLeftSideCollapsed, setIsLeftSideCollapsed] = useState(true);
  const [searchExercise, setSearchExercise] = useState<string>("");

  const activeItem = useMemo(() => {
    let activeElement = exerciseList?.find(
      (item, index) =>
        item.exercise_id === active?.data?.current?.exercise_id &&
        index === Number(active?.id) - 1
    );
    if (activeElement! == undefined)
      return { ...activeElement, index: active?.id };

    return activeElement;
  }, [active, exerciseList]);

  const exercises: Exercise[] = data?.exercises;

  const filteredExercise = useMemo(() => {
    if (searchExercise === "") return exercises;
    return exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(searchExercise.toLowerCase()) ||
        exercise.body_part
          .toLowerCase()
          .includes(searchExercise.toLowerCase()) ||
        exercise.focus.toLowerCase().includes(searchExercise.toLowerCase())
    );
  }, [exercises, searchExercise]);

  const handleSelectExercise = (exercise: any) => {
    const data = {
      ...exercise,
      exercise_id: exercise._id,
      repetition: 13,
      // todo: change rep back to 0
      time_base: false,
      rest: 20,
    };
    setExerciseList((prev) => [...prev, data]);
  };

  const handleRemoveExercise = (id: number) => {
    const filteredList = exerciseList.filter((_, index) => index !== id);
    setExerciseList(filteredList);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (over && active?.id !== over?.id) {
      setExerciseList((prev) => {
        const activeIndex = prev.findIndex(
          (item, index) =>
            item.exercise_id === active?.data?.current?.exercise_id &&
            index === active?.id - 1
        );
        const overIndex = prev.findIndex(
          (item, index) =>
            item.exercise_id === over?.data?.current?.exercise_id &&
            index === over?.id - 1
        );
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
    setActive(null);
  }

  return (
    <div className=" md:grid md:grid-cols-[1fr,0.6fr] flex h-full w-full ">
      <div
        className={cn(
          "lg:px-6 md:px-3 max-sm:border-r max-sm:relative border-zinc-800 w-full min-h-[400px]",
          {
            "max-md:hidden": isLeftSideCollapsed,
          }
        )}
      >
        <div
          onClick={() => setIsLeftSideCollapsed(true)}
          className=" md:hidden bg-zinc-700/75 cursor-pointer w-fit px-2 py-1 absolute right-0 rounded-l-full backdrop-blur-md"
        >
          <ChevronLeft />
        </div>
        <div className="flex items-center justify-between">
          <p className="my-3">Selected Exercise ({exerciseList.length})</p>
          <p
            className=" text-emerald-500 bg-zinc-900 rounded p-1 px-2 cursor-pointer  "
            onClick={() => setExerciseList([])}
          >
            Clear all
          </p>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={({ active }) => {
            setActive(active);
          }}
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActive(null);
          }}
        >
          <SortableContext items={exerciseList} strategy={rectSortingStrategy}>
            <ul
              className="flex flex-col gap-3 max-h-[500px] px-2 overflow-auto"
              role="application"
            >
              {exerciseList.map((exercise, index) => (
                <SortableItem
                  exercise={exercise}
                  handleRemoveExercise={handleRemoveExercise}
                  setExerciseList={setExerciseList}
                  index={index}
                  key={index + 1}
                />
              ))}
            </ul>
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimationConfig}>
            {activeItem ? (
              <SortableItem
                exercise={activeItem}
                handleRemoveExercise={(value: number) => {}}
                index={activeItem.index}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <div
        className={cn(
          "border-l border-zinc-800 px-6 relative w-full max-sm:flex-1",
          {
            "max-md:hidden": !isLeftSideCollapsed,
          }
        )}
      >
        <div
          onClick={() => setIsLeftSideCollapsed(false)}
          className="md:hidden bg-zinc-700/75 cursor-pointer w-fit px-2 py-1 absolute left-0 rounded-r-full backdrop-blur-md"
        >
          <ChevronRight />
        </div>
        <Input
          placeholder="Exercise name "
          className="my-3"
          value={searchExercise}
          onChange={(e) => setSearchExercise(e.target.value)}
        />
        {isLoading ? (
          <>
            <div className="flex gap-3 flex-col">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className=" w-full h-[65px]" />
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col ">
              {filteredExercise?.map((exercise) => (
                <div
                  className="cursor-pointer flex items-center gap-5 hover:bg-zinc-900"
                  onClick={() => handleSelectExercise(exercise)}
                  key={exercise._id}
                >
                  <ExerciseCard exercise={exercise} select />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default RightWorkoutForm;

type SortableItemProp = {
  exercise: any;
  handleRemoveExercise: (exercise: number) => void;
  index: number;
  setExerciseList?: React.Dispatch<React.SetStateAction<any[]>>;
};

const SortableItem = ({
  exercise,
  handleRemoveExercise,
  index,
  setExerciseList,
}: SortableItemProp) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: index + 1,
    data: {
      exercise_id: exercise.exercise_id,
    },
  });

  // const { setNodeRef, transform, listeners, setActivatorNodeRef, attributes } =
  //   useDraggable({
  //     id: index + 1,
  //     data: {
  //       exercise_id: exercise.exercise_id,
  //     },
  //   });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  // };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTimebaseChange = (value: boolean) => {
    const data = {
      ...exercise,
      time_base: value,
    };

    setExerciseList?.((prev) => {
      return prev.map((value: any, valueIndex: any) => {
        if (valueIndex === index) {
          return data;
        }
        return value;
      });
    });
  };

  const handleRepetitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    const exerciseDate = {
      ...exercise,
      repetition: Number(e.target.value),
    };

    setExerciseList?.((prev) => {
      return prev.map((value: any, valueIndex: any) => {
        if (valueIndex === index) {
          return exerciseDate;
        }
        return value;
      });
    });
  };

  const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    const exerciseDate = {
      ...exercise,
      rest: Number(e.target.value),
    };
    setExerciseList?.((prev) => {
      return prev.map((value: any, valueIndex: any) => {
        if (valueIndex === index) {
          return exerciseDate;
        }
        return value;
      });
    });
  };
  return (
    <li style={style} ref={setNodeRef} {...attributes}>
      <div className="flex gap-1">
        <div
          {...listeners}
          ref={setActivatorNodeRef}
          className=" bg-zinc-900 w-[60px] rounded-l-md flex justify-center items-center cursor-grab"
        >
          <Grip className="" size={16} />
        </div>
        <div className="w-full ">
          <ExerciseCard exercise={exercise} />
          <hr />
          <div className="px-2 py-2 bg-gradient-to-r from-zinc-900/70 via-zinc-900/80   to-zinc-900/70 flex items-center justify-between gap-1">
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-[2px]">
                <div
                  onClick={() => handleTimebaseChange(true)}
                  className={cn(
                    " bg-zinc-800 px-1 py-[4px] rounded-l-sm hover:bg-zinc-700",
                    { "bg-emerald-600": exercise?.time_base ? true : false }
                  )}
                >
                  <Timer />
                </div>
                <div
                  onClick={() => handleTimebaseChange(false)}
                  className={cn(
                    "bg-zinc-800 px-2 py-[4px] rounded-r-sm text-center hover:bg-zinc-700",
                    { "bg-emerald-600": !exercise?.time_base ? true : false }
                  )}
                >
                  x1
                </div>
              </div>

              <input
                className=" outline-none bg-zinc-950 border border-zinc-800 w-[50px] rounded-sm py-[4px] text-center "
                autoFocus={index === 0 ? true : false}
                value={exercise?.repetition}
                onChange={handleRepetitionChange}
                maxLength={3}
              />
            </div>

            <div className="flex gap-2 items-center float-right">
              <label>Rest</label>
              <input
                type="text"
                className=" outline-none bg-zinc-950 border border-zinc-800 w-[50px] rounded-sm py-[4px] text-center"
                maxLength={3}
                value={exercise?.rest}
                onChange={handleRestChange}
              />
            </div>
          </div>
        </div>
        <div
          className="bg-zinc-900 w-[60px] rounded-r-md flex justify-center items-center cursor-pointer group"
          onClick={() => handleRemoveExercise(index)}
        >
          <Trash
            className="fill-rose-600/30 text-rose-600/30 group-hover:fill-rose-600 group-hover:text-rose-600 transition"
            size={16}
          />
        </div>
      </div>
    </li>
  );
};

const ExerciseCard = ({
  exercise,
  select,
}: {
  exercise: Exercise;
  select?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between   p-2 px-3  items-center transition",
        { "hover:bg-zinc-900 border-b border-zinc-800": select },
        {
          "bg-gradient-to-r from-zinc-900/70 via-zinc-900/80   to-zinc-900/70":
            !select,
        }
      )}
    >
      <div className="flex items-start w-[50%] truncate text-sm">
        <p>{exercise.name}</p>
      </div>
      <div className="w-[40px] h-[40px] relative">
        <Image
          src={exercise.image?.url}
          alt={exercise.name}
          fill
          loading="lazy"
          className=" object-cover rounded-sm absolute"
        />
      </div>
    </div>
  );
};
