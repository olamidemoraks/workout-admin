"use client";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

const Protected = ({ children }: PropsWithChildren) => {
  const { user } = useSelector((state: any) => state.auth);
  return Object.keys(user).length !== 0 ? children : children;
};

export default Protected;
