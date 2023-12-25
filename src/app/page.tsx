"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetVerificationCodeMutation,
  useSiginAdminMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [getVerificationCode, { isLoading, error, isSuccess }] =
    useGetVerificationCodeMutation();
  const [
    siginAdmin,
    {
      isLoading: isVerifyingCode,
      isSuccess: verificationSuccess,
      error: verificationError,
    },
  ] = useSiginAdminMutation();
  const [email, setEmail] = useState("");
  const [steps, setSteps] = useState("get-code");
  const [code, setCode] = useState("");
  const { token, user } = useSelector((state: any) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      redirect("/dashboard");
    }
  }, [router, user]);

  const handleSendVerificationCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getVerificationCode({ email });
  };

  const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setSteps("get-code");
      return;
    }
    siginAdmin({ activation_code: code, activation_token: token });
  };

  useEffect(() => {
    if (isSuccess) {
      setSteps("verify-code");
      toast({
        title: "Check your email to get code",
      });
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: errorData.data.message,
        });
      }
    }
    if (verificationSuccess) {
      router.push("/dashboard");
    }
    if (verificationError) {
      if ("data" in verificationError) {
        const errorData = verificationError as any;
        toast({
          variant: "destructive",
          title: "Wrong Code",
          description: errorData.data.message,
        });
      }
    }
  }, [error, isSuccess, verificationError, verificationSuccess]);

  let content: any;
  switch (steps) {
    case "get-code":
      content = (
        <>
          <div>
            <p className="text-3xl font-semibold text-center">Workout</p>
          </div>
          <form
            onSubmit={handleSendVerificationCode}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
            <Button disabled={isLoading} className=" text-base" type="submit">
              {isLoading ? "Sending..." : "Get Verification Code"}
            </Button>
          </form>
        </>
      );
      break;
    case "verify-code":
      content = (
        <>
          <div>
            <p className="text-3xl font-semibold text-center">Workout</p>
            <p className=" text-center text-base mt-3 text-zinc-300">
              Check your email for verification code
            </p>
          </div>
          <form className="flex flex-col gap-6" onSubmit={handleVerifyCode}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email Verification Code</label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className=" placeholder:text-lg  text-lg"
                placeholder="*** ***"
                maxLength={6}
                required
              />
              <p className=" text-zinc-500 mt-2">
                Enter the 6-digit verification code sent to{" "}
                <span className="text-zinc-400">
                  {email.split("@")[0].slice(0, 4)}...{email.split("@")[1]}
                </span>
              </p>
            </div>
            <Button disabled={isVerifyingCode} className=" text-base">
              {isVerifyingCode ? "Verifiying..." : "Verify Code"}
            </Button>
          </form>
        </>
      );
      break;

    default:
      break;
  }
  return (
    <main className=" m-auto flex items-center w-full justify-center h-screen">
      <div className="border border-zinc-500/30 rounded-lg py-7 px-8 w-[90%] md:w-[500px] min-h-[300px] flex flex-col justify-center gap-9">
        {content}
      </div>
    </main>
  );
}
