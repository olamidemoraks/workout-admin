import React, { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

type populateExerciseProps = {
  exercise: Exercise;
  setValue: UseFormSetValue<any>;
  setMaleImage: React.Dispatch<any>;
  setFocusPoint: React.Dispatch<React.SetStateAction<string[]>>;
};

const usePopulateExercise: React.FC<populateExerciseProps> = ({
  exercise,
  setValue,
  setMaleImage,
  setFocusPoint,
}) => {
  useEffect(() => {
    if (exercise) {
      setValue("name", exercise.name);
      setValue("body_part", exercise.body_part);
      setValue("focus", exercise.focus);
      setValue("equipment", exercise.equipment);
      setValue("location", exercise.location);
      setValue("tips", exercise.tips);
      setMaleImage(exercise.image);
      setFocusPoint(exercise.focus);
    }
  }, [exercise, setFocusPoint, setMaleImage, setValue]);

  return null;
};
export default usePopulateExercise;
