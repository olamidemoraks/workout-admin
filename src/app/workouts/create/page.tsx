import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateWorkout from "@/components/workout/CreateWorkout";
import Protected from "@/hooks/protected";
import { cn } from "@/lib/utils";
import { Image as LucidImage, Plus, Zap } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <>
      <Protected>
        <Header />
        <MaxWidthWrapper>
          {/* <p className="mt-3 text-xl">Workout Program</p> */}
        </MaxWidthWrapper>
        <CreateWorkout />
      </Protected>
    </>
  );
};

export default Page;
