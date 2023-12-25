import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateChallenges from "@/components/challenge/CreateChallenges";
import EditChallenges from "@/components/challenge/EditChallenges";
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
    <Protected>
      <Header />
      <MaxWidthWrapper></MaxWidthWrapper>
      <CreateChallenges id={id} />
    </Protected>
  );
};
export default page;
