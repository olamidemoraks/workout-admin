"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronsUpDown, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogoutUserQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLogout] = useState(true);
  const {} = useLogoutUserQuery(
    {},
    {
      skip: logout,
    }
  );

  const handleLogout = () => {
    setLogout(false);
    router.push("/");
  };

  return (
    <div className=" border-b border-zinc-400/25 w-full sticky top-0 left-0 right-0 z-30 flex items-center justify-center backdrop-blur-xl bg-zinc-950/30 ">
      <div className="flex items-center justify-between w-[90%]  xl:w-[1240px] lg:w-[1020px] px-2">
        <div className=" p-4 py-6 z-40 text-xl font-semibold text-white/90">
          Workout
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" bg-zinc-900/70 backdrop-blur-lg p-2 flex items-center justify-evenly rounded-lg space-x-2 hover:bg-zinc-900 group cursor-pointer transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-pink-600 via-orange-500" />
              <p className=" text-sm sm:block hidden ">{user?.name}</p>
              <ChevronsUpDown
                className=" text-zinc-500 group-hover:text-white"
                size={18}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={handleLogout}
            >
              <LogOutIcon size={18} className="mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
