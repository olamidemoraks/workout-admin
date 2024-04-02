import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateExercise from "@/components/exercises/CreateExercise";
import EditExercise from "@/components/exercises/EditExercise";
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
          <CreateExercise id={id} />
        </MaxWidthWrapper>
      </Protected>
    </>
  );
};
export default page;
