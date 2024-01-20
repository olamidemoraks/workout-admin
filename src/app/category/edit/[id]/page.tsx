import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateCategory from "@/components/category/CreateCategory";
import Protected from "@/hooks/protected";
import React from "react";

interface IPage {
  params: {
    id: string;
  };
}
const Page = ({ params }: IPage) => {
  return (
    <Protected>
      <Header />
      <MaxWidthWrapper>
        <CreateCategory id={params.id} />
      </MaxWidthWrapper>
    </Protected>
  );
};

export default Page;
