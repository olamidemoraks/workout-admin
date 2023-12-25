import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Workouts from "@/components/workout/Workouts";
import Protected from "@/hooks/protected";
import React from "react";

const Page = () => {
  return (
    <>
      <Protected>
        <Header />
        <MaxWidthWrapper>
          <Workouts />
        </MaxWidthWrapper>
      </Protected>
    </>
  );
};

export default Page;
