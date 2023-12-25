import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Challenges from "@/components/challenge/Challenges";
import Protected from "@/hooks/protected";
import React from "react";

const pages = () => {
  return (
    <Protected>
      <Header />
      <MaxWidthWrapper>
        <Challenges />
      </MaxWidthWrapper>
    </Protected>
  );
};

export default pages;
