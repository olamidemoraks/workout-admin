/* eslint-disable @next/next/no-img-element */
"use client";
import { Camera, Check, Image, Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/features/category/categoryApi";
import { useRouter } from "next/navigation";

type CreateCategoryProps = {
  id?: string;
};

const CreateCategory: React.FC<CreateCategoryProps> = ({ id }) => {
  const { data } = useGetCategoryQuery({ id });

  const [createCategory, { isLoading, isSuccess, error }] =
    useCreateCategoryMutation();

  const [
    editCategory,
    { isLoading: isEditing, isSuccess: isEdited, error: editError },
  ] = useEditCategoryMutation();

  const [
    deleteCategory,
    { isLoading: isDeleting, isSuccess: isDeleted, error: deleteError },
  ] = useDeleteCategoryMutation();
  const [title, setTitle] = useState("");
  const [feature, setFeature] = useState(true);
  const [image, setImage] = useState<any>(null);

  const router = useRouter();

  const { toast } = useToast();
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        if (fileReader.readyState === 2) {
          setImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (data) {
      const category = data?.category;
      setTitle(category?.title);
      setImage(category?.image.url);
      setFeature(category?.feature);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Challenge Created Successful",
      });
      //   router.push("/challenges");
      setImage("");
      setTitle("");
      setFeature(true);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorData.data.message,
        });
      }
    }
    if (isEdited) {
      toast({
        title: "Category Updated Successful",
      });
    }
    if (editError) {
      if ("data" in editError) {
        const errorData = editError as any;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorData.data.message,
        });
      }
    }
    if (isDeleted) {
      toast({
        title: "Category deleted",
      });
      router.push("/category");
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: errorData.data.message,
        });
      }
    }
  }, [
    editCategory,
    editError,
    error,
    isDeleted,
    isEdited,
    isSuccess,
    router,
    toast,
  ]);

  const handleSubmit = async () => {
    if (!title || !image) {
      toast({ variant: "destructive", title: "Please fill in all the fields" });
      return;
    }

    const data = {
      title,
      image,
      feature,
    };

    if (id) {
      await editCategory({ id, data });
    } else {
      await createCategory(data);
    }
  };

  return (
    <div className=" mt-5 flex flex-col md:flex-row gap-6">
      <label
        htmlFor="image"
        className="md:w-[400px] w-full h-[400px] border flex items-center justify-center rounded-md group cursor-pointer bg-zinc-900"
      >
        {!image ? (
          <Camera
            className=" text-zinc-500 group-hover:text-zinc-200"
            size={40}
          />
        ) : (
          <img
            src={image}
            className="w-full h-full object-cover rounded-md"
            alt="category-image "
          />
        )}

        <input hidden type="file" id="image" onChange={handleSelectImage} />
      </label>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Category Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" lg:w-[500px] md:w-[300px] w-full"
          />
        </div>
        <div className="flex gap-5 items-center">
          <label>Feature</label>
          <div
            onClick={() => setFeature((prev) => !prev)}
            className={cn(
              "h-6 w-6 rounded-sm ring-2 ring-orange-400 relative cursor-pointer",
              {
                "bg-orange-400 ring-0": feature,
              }
            )}
          >
            {feature && <Check className="absolute text-black" />}
          </div>
        </div>
        <small className="-mt-2 tracking-wide text-neutral-500">
          Feature to decide if category should be displayed on home page
        </small>

        <div className="flex gap-5">
          {id && (
            <Button onClick={() => deleteCategory(id)} variant={"destructive"}>
              Remove
            </Button>
          )}
          <Button onClick={handleSubmit} className="flex gap-2 items-center">
            {id ? "Edit Category" : "Create Category"}{" "}
            {isEditing || isLoading ? (
              <Loader2 className="animate-spin" size={19} />
            ) : null}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateCategory;
