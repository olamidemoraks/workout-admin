import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Categories from "@/components/category/Categories";
import Protected from "@/hooks/protected";
import React from "react";

const Page = () => {
  return (
    <Protected>
      <Header />
      <MaxWidthWrapper>
        <Categories />
      </MaxWidthWrapper>
    </Protected>
  );
};

export default Page;
