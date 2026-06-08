"use client";

import { authClient } from "@/lib/auth-client";
import { Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export function SigninPage() {
  const [isShowPass, setIsShowPass] = useState(false);

  
  const session = authClient.useSession();

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = async (userData) => {
    const { email, password } = userData;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) toast.error("Error: " + error.message);
    if (data) toast.success("Login successful!");
  };

  return (
    <div className="flex justify-center my-10 space-y-5">
      <div className="flex shadow rounded-md p-10 max-w-md flex-col gap-4 dark:border">
        <Form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <h2 className="text-xl font-bold">Welcome to Our Application</h2>
            <p className="text-sm text-gray-500">Please Login To Use the Platform</p>
          </div>

          <TextField isRequired name="email" type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                return "Please enter a valid email address";
            }}
          >
            <Label>Email</Label>
            <Input placeholder="Enter Your Email" {...register("email")} />
            <FieldError />
          </TextField>

          <TextField className="relative" isRequired minLength={8}
            name="password" type={isShowPass ? "text" : "password"}
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Password must contain at least one number";
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" {...register("password")} />
            <span onClick={() => setIsShowPass(!isShowPass)}
              className="absolute right-3 top-8.5 text-gray-400">
              {isShowPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>

          <div className="w-full space-y-3">
            <button type="submit" className="w-full flex items-center justify-center h-[30px] text-[12px] border rounded-full text-green-800 border-green-800 hover:bg-green-800 hover:text-white cursor-pointer">
              Login
            </button>
            <button type="reset" className="w-full flex items-center justify-center h-[30px] text-[12px] border py-2 px-0 rounded-full text-green-800 border-green-800 hover:bg-green-800 hover:text-white cursor-pointer">
              Reset
            </button>
          </div>
        </Form>

        <div className="flex items-center gap-3">
          <div className="flex-grow h-px bg-gray-400"></div>
          <p className="text-gray-400">or</p>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>

        <div className="flex items-center">
          <button onClick={handleGoogleSignIn}
            className="w-full gap-1 flex items-center justify-center text-[12px] border py-2 px-0 rounded-full text-green-800 border-green-800 hover:bg-green-800 hover:text-white cursor-pointer">
            <FaGoogle /> Login with Google
          </button>
        </div>

        <p className="text-gray-500 text-[12px] px-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-red-500">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;