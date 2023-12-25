import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import CreateExercise from "@/components/exercises/CreateExercise";
import { Button, buttonVariants } from "@/components/ui/button";
import Protected from "@/hooks/protected";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Protected>
        <Header />
        <MaxWidthWrapper>
          <div className="w-full">
            <div className="mt-4 flex items-center w-full justify-between">
              <CreateExercise />
            </div>
          </div>
        </MaxWidthWrapper>
      </Protected>
    </>
  );
};

export default Page;
