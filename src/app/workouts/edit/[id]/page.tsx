import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import EditExercise from "@/components/exercises/EditExercise";
import EditWorkout from "@/components/workout/EditWorkout";
import Protected from "@/hooks/protected";
import React from "react";

type pageProps = {
  params: {
    id: string;
  };
};

const page: React.FC<pageProps> = ({ params }) => {
  const { id } = params;
  return (
    <>
      <Protected>
        <Header />
        <MaxWidthWrapper>
          {/* <p className="mt-3 text-xl">Workout Program</p> */}
        </MaxWidthWrapper>
        <EditWorkout id={id} />
      </Protected>
    </>
  );
};
export default page;
