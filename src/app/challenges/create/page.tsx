import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateChallenges from "@/components/challenge/CreateChallenges";
import Protected from "@/hooks/protected";
import React from "react";

const Page = () => {
  return (
    <Protected>
      <Header />
      <MaxWidthWrapper></MaxWidthWrapper>
      <CreateChallenges />
    </Protected>
  );
};

export default Page;
