"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Plus } from "lucide-react";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import Image from "next/image";

const Categories = () => {
  const { data, isLoading } = useGetAllCategoryQuery({});
  const categories = data?.categories;

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center w-full justify-between">
        <p className=" text-2xl">{categories?.length} Category</p>
        <Link className={buttonVariants({})} href={"/category/create"}>
          Create Category <Plus size={16} className=" inline-block ml-2" />
        </Link>
      </div>
      <div className="mt-8">
        <div className=" grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-8">
          {categories?.map((category: any) => (
            <Link href={`/category/edit/${category?._id}`} key={category?._id}>
              <div className=" h-[170px] relative flex items-center justify-center">
                <Image
                  src={category?.image.url}
                  alt={category?.title}
                  fill
                  className="object-cover rounded-lg brightness-50 hover:brightness-75"
                />
                <p className=" text-xl absolute uppercase">
                  {category?.title?.split("_").join(" ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
