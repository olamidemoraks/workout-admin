import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateCategory from "@/components/category/CreateCategory";
import Protected from "@/hooks/protected";
import React from "react";

const Page = () => {
  return (
    <Protected>
      <Header />
      <MaxWidthWrapper>
        <CreateCategory />
      </MaxWidthWrapper>
    </Protected>
  );
};

export default Page;
