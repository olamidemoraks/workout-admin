import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Exercises from "@/components/exercises/Exercises";
import Protected from "@/hooks/protected";

import React from "react";

const Page = () => {
  return (
    <>
      <Protected>
        <Header />
        <MaxWidthWrapper>
          <Exercises />
        </MaxWidthWrapper>
      </Protected>
    </>
  );
};

export default Page;
