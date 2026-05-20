
"use client";

import { authClient } from "@/lib/auth-client";
// import { authClient } from "@/lib/auth-client";
import { Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";



export function RegisterPage() {

const [isShowPass , setIsShowPass] = useState(false)   
const router = useRouter();

// const handleRegister = async(e) =>{
//     e.preventDefault();

//     const formData  = new FormData(e.currentTarget)
//     console.log(formData);

// }


const handleGoogleSignIn = async() =>{
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });

}

    const {register,
    handleSubmit,} = useForm()

    const onSubmit = async(useData) => {
    console.log(useData);

    const {email, name, image, password }= useData;
    console.log(email , name , image, password);


const { data, error } = await authClient.signUp.email({
  name,
  email,
  password,
  image,
  callbackURL: "/",
});

console.log("DATA:", data);
console.log("ERROR:", error);

    if (error){
      toast.error('error signUp ' + error.message)
    }
      if (data) {
    router.push("/") 
  }
    if(data){
      toast.success('submit successfully')
    }
    else{
      return
    }
  };


  return (

<div className="flex justify-center my-10 ">

<div className="flex shadow rounded-md p-10 w-full max-w-md flex-col gap-4">

    <Form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        <div className="text-center">
            <h2 className="text-xl font-bold ">Welcome to Our Application
            </h2>
            <p className="text-sm text-gray-500 ">Please Register To Use the Platform</p>
        </div>


                    {/* name */}
      <TextField
        isRequired
        name="name"
        type="name"
      >
        <Label>Name</Label>
        <Input placeholder="Enter Your Name" 
        {...register("name")}
        />
        <FieldError />
      </TextField>


                    {/* image url */}
      <TextField
        isRequired
        name="image"
        type="name"
      >
        <Label>Image URL</Label>
        <Input placeholder="Type Here Image URL" 
        {...register("image")}
        />
        <FieldError />
      </TextField>
                    {/* email */}
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter Your Email" 
        {...register("email")}
        />
        <FieldError />
      </TextField>
                    {/* password */}
      <TextField
        isRequired
        minLength={8}
        name="password"
        type={isShowPass ? "text":"password"}
        className="relative"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }

          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" 
        {...register("password")}
        />
        <span onClick={() => setIsShowPass(!isShowPass)}
            className="absolute right-3 top-8.5 text-gray-400"
            >
            {isShowPass? <FaRegEye /> : <FaRegEyeSlash /> }
        </span>
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

                    {/* buttons */}
      <div className=" ">
        <button type="submit" className="flex items-center justify-center w-full py-2 text-[12px] border rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white cursor-pointer">
          Register
        </button>
        

    {/* <p className=" text-gray-500 text-[12px] px-2">Already have an account? 
        <Link href={"/signIn"} className="text-red-500">Login</Link>    
    </p>   */}
      </div>


    </Form> 

    <div className="flex items-center gap-3">
      <div className="flex-grow h-px bg-gray-400"></div>
        <p className="text-gray-400 flex ">or</p>
      <div className="flex-grow h-px bg-gray-400"></div>  
    </div>

                        {/* google btn */}
    <div className="flex items-center">
    <button type="button" className="w-full gap-1 flex items-center justify-center text-[12px]  border py-2 px-0 rounded-full text-green-500 border-green-500 hover:bg-green-500 hover:text-white cursor-pointer"
    onClick={handleGoogleSignIn}
    >
        <FaGoogle></FaGoogle>
          Login with Google
    </button>
    </div>

    <p className="flex justify-center text-gray-500 text-[12px] px-2">Already have an account? 
        <Link href={"/signIn"} className="text-red-500">Login</Link>    
    </p>    
</div>

    </div>    
  );
}
export default RegisterPage;
