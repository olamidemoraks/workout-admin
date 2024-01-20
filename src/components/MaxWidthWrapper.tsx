"use client";
import { PropsWithChildren } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Activity,
  Dumbbell,
  LayoutGrid,
  LucideBanknote,
  UserSquare,
  Zap,
  Group,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const MaxWidthWrapper = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const path = usePathname();

  const handleNavigate = (name: string) => {
    router.push(`/${name}`);
  };

  const pathName = path.substring(1).split("/");
  return (
    <div className="w-[90%] xl:w-[1240px] lg:w-[1020px] px-2 m-auto mt-7 ">
      <h1 className=" lg:text-[36px] sm:text-[28px] text-[23px] font-bold capitalize sm:text-start text-center">
        {path
          .substring(1)
          .split("/")
          .slice(0, 2)
          .map((links, index) => (
            <Link
              href={index < 1 ? `/${links}` : `/${pathName[0]}/${pathName[1]}/`}
              key={index}
            >
              {index < 1 ? (
                <span
                  className="
                  hover:underline
                  underline-offset-2"
                >
                  {links}
                </span>
              ) : (
                <>
                  {" "}
                  /{" "}
                  <span className=" hover:underline underline-offset-2">
                    {links}
                  </span>
                </>
              )}
            </Link>
          ))}
      </h1>
      <div className="mt-2 mx-auto w-full">
        <Tabs
          defaultValue={path.substring(1).split("/")?.[0]}
          className="w-[400px]"
        >
          <TabsList>
            <TabsTrigger
              value="dashboard"
              onClick={() => handleNavigate("dashboard")}
            >
              <LayoutGrid size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Reports</span>
            </TabsTrigger>

            <TabsTrigger
              value="exercises"
              onClick={() => handleNavigate("exercises")}
            >
              <Dumbbell size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Exercises</span>
            </TabsTrigger>
            <TabsTrigger
              value="workouts"
              onClick={() => handleNavigate("workouts")}
            >
              <Activity size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Workouts</span>
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              onClick={() => handleNavigate("challenges")}
            >
              <Zap size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Challenges</span>
            </TabsTrigger>

            <TabsTrigger
              value="category"
              onClick={() => handleNavigate("category")}
            >
              <Group size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Category</span>
            </TabsTrigger>

            <TabsTrigger value="users" onClick={() => handleNavigate("users")}>
              <UserSquare size={20} className="mr-2" />{" "}
              <span className=" sm:inline-block hidden">Users</span>
            </TabsTrigger>
            <TabsTrigger value="billing">
              <LucideBanknote
                size={20}
                className="mr-2"
                onClick={() => handleNavigate("transaction")}
              />{" "}
              <span className=" sm:inline-block hidden">Transaction</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
