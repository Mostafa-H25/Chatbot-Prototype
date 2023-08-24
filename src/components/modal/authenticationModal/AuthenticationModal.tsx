"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useGlobalContext } from "@/services/context/GlobalContext";
<<<<<<< HEAD
import {setUser ,setIsAuthenticationModalOpen } from '@/services/redux/reducers/appSlice'
import { useSelector , useDispatch } from "react-redux";
import { DummyUser } from "@/dummyData/dummyUser";
=======
import { useModalContext } from "@/services/context/ModalContext";
>>>>>>> 123241c196717f0f5c54cde8bb74e9e7f6b479ee

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

interface Props {
  authenticationType: string;
  closeModal: any;
  setAuthenticationType: any;
}

export default function AuthenticationModal({
  authenticationType,
  closeModal,
  setAuthenticationType,
}: Props) {
<<<<<<< HEAD
  //const { setUser, setIsAuthenticationModalOpen } =useGlobalContext();
  const dispatch = useDispatch()
=======
  const { setUser } = useGlobalContext();
  const { setIsAuthenticationModalOpen } = useModalContext();
>>>>>>> 123241c196717f0f5c54cde8bb74e9e7f6b479ee

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [authenticatingUser, setAuthenticatingUser] = useState<Partial<User>>({
    email: "",
    password: "",
  });

  const [registeringUser, setRegisteringUser] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    userRole: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    userRole: "BASIC",
  });

  const goBack = () => {
    closeModal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (authenticationType === "Sign In") {
      setAuthenticatingUser({
        ...authenticatingUser,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    } else if (authenticationType === "Register") {
      setRegisteringUser({
        ...registeringUser,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  const logIn = async (e: FormEvent<HTMLFormElement>) => {
    // mn awel 82 l3'ayt 99 da el adeem b3d kda el gaded
    setAuthenticatingUser({
      ...authenticatingUser,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    setIsLoading(true);
    // send user to backend
    // receive authenticated user from backend
    // user authenticated
    setIsLoading(false);
    if (true) {
      DummyUser.isAuthenticated = true;
      dispatch(setUser(DummyUser));
      e.currentTarget.reset();
      dispatch(setIsAuthenticationModalOpen(true));
    }
    // user is not verified
    else if (false) {
      // toast
    }
    // wrong email
    else if (false) {
      // toast
    }
    // wrong password
    else if (false) {
    try {
      const user = authenticatingUser;
      setIsLoading(true);
      // send user to backend
      const endpoint = "/api/authentication/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      };
      // receive token from backend
      const response = await fetch(endpoint, options);
      const data = response.json();
      // user authenticated
      if (response.ok) {
        setIsLoading(false);
        setAuthenticatingUser({
          email: "",
          password: "",
        });
        setIsAuthenticationModalOpen(false);
      }
    } catch (error) {
      // toast
      setIsLoading(false);
      console.log("ERROR", error);
    }
  };

  const registers = async (e: FormEvent<HTMLFormElement>) => {
    setRegisteringUser({
      ...registeringUser,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    try {
      const user = registeringUser;
      // send user to backend
      const endpoint = "/api/authentication/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      // toast check email for verification
      setRegisteringUser({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        userRole: "BASIC",
      });
      setAuthenticationType("Sign In");
    } catch (error) {
      // toast
      console.log("ERROR", error);
    }
  };
  const handleSignin = () => {
    // Perform logout actions if needed

    // Redirect to login page while replacing the current route
    router.push("/chats");
  };

  const handleSubmitForm = (
    e: FormEvent<HTMLFormElement>,
    authenticationType: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (authenticationType === "Sign In") {
      logIn(e);
    } else if (authenticationType === "Register") {
      registers(e);
    }
  };
  const form = useForm();
  const {register ,handleSubmit, formState , watch , clearErrors} = form;
  const {errors} = formState;

  return (
    <motion.div  initial={{y:'-100vw'}}
    animate={{y:0}}
    transition={{type:'spring' , duration: 2,stiffness: 200 }}
     className="bg-white dark:bg-[#202123] rounded-lg px-8 py-2 shadow-md max-w-md w-full text-black">
      <button
        onClick={() => goBack()}
        type="button"
        className="absolute -top-50 -left-50 z-10"
      >
        <ChevronLeftIcon fontSize="large" />
      </button>

      <p className="py-4 text-4xl text-center">{authenticationType}</p>
      <form
        // onSubmit={(event: FormEvent<HTMLFormElement>) =>
        //   handleSubmitForm(event, authenticationType)
        // }
          onSubmit={
        handleSubmit((event ) => handleSubmitForm(event, authenticationType))
        }

        noValidate
      >
        {/* Registration/Sign In Form */}
        <div className="p-4">
          <label className="p-2 text-sm font-bold " htmlFor="email">
            Email
          </label>
          <input
            className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow  focus:outline-none text-neutral-100 "
            type="email"
            id="email"
            {...register("email", {
              required: {
                value : true ,
                message :'Email is reqiured !'},
              pattern : {
                value :/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
                message : 'Invalid Email'
              }
            })}
            value={
              authenticationType === "Sign In"
                ? authenticatingUser.email
                : registeringUser.email
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) =>{
              handleChange(event);
              clearErrors("email");
            }
            }
          />
           <p className="p-2 mb-1 text-rose-900 rounded">{errors.email?.message}</p>
          <label className="p-2 text-sm font-bold ">Password</label>
          <input
            className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow  focus:outline-none text-neutral-100 "
            type="password"
            id="password"
            {...register('password' , {
              required: {
                value : true ,
                message :'Password is reqiured !'},
                minLength: { value: 8, message: "Password must be more than or equal 8 characters" },
                maxLength: { value: 24, message: "Password cannot exceed more than 24 characters" },
              pattern : {
                value :/^(?=.*[A-Z])(?=.*[!@#$!])[a-zA-Z!@#$!0-9]+$/ ,
                message : ' Must include uppercase and lowercase letters , a number and a special character.'
              }
            })}
            value={
              authenticationType === "Sign In"
                ? authenticatingUser.password
                : registeringUser.password
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) =>{
              handleChange(event)
              clearErrors("password");
            }
          }
          />
          <p className="p-2 mb-1 text-rose-900 rounded">{errors.password?.message}</p>
          {/* Register Inputs */}
          {authenticationType === "Register" && (
            <>
              <label className="p-2 text-sm font-bold ">confirm Password</label>
              <input
                className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
                type="password"
                id="confirmPassword"
                {...register('confirmPassword' ,  {
                  required: {
                    value : true ,
                    message :'Please write your password again'},
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return "Your passwords do no match";
                      }
                    }
                  }
                )}
                value={registeringUser.confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>{
                  handleChange(event)
                  clearErrors("confirmPassword");
                }
                }
              />
              <p className="p-2 mb-1 text-rose-900 rounded">{errors.confirmPassword?.message}</p>
              <label className="p-2 text-sm font-bold ">Username</label>
              <input
                className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
                type="text"
                id="username"
                {...register('username' ,  {
                  required: {
                    value : true ,
                    message :'Username is reqiured !'},
                    minLength: { value: 3, message: "Password must be more than or equal 3 characters" },
                } )}
                value={registeringUser.username}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>{
                  handleChange(event)
                  clearErrors("username");
                }
                }
              />
              <p className="p-2 mb-1 text-rose-900 rounded">{errors.username?.message}</p>
              <div>
                <p className="p-2 text-sm font-bold ">Registration Type</p>
                <div className="flex flex-col px-4">
                  <div>
                    <input
                      className=""
                      type="radio"
                      id="basicUserRole"
                      {...register('userRole' , {
                        required: {
                          value : true ,
                          message :'Please Choose a type!'},

                      })}
                      value="BASIC"
                    />
                    <label
                      htmlFor="basicUserRole"
                      className="p-2 text-sm font-bold "
                    >
                      Basic
                    </label>
                  </div>
                  <div>
                    <input
                      className=""
                      type="radio"
                      id="premiumUserRole"
                      {...register('userRole' ,  {
                        required: {
                          value : true ,
                          message :'Please Choose a type'},

                      })}
                      value="PREMIUM"
                    />
                    <label
                      htmlFor="premiumUserRole"
                      className="p-2 text-sm font-bold "
                    >
                      Premium
                    </label>
                  </div>
                   <p className="p-2 mb-1 text-rose-900 rounded">{errors.userRole?.message}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Registration/Sign In Button */}
        {authenticationType === "Sign In" ? (
          <>
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSignin}
              className="my-2 w-full rounded-lg border px-4 py-2 shadow focus:outline-none border-neutral-800 border-opacity-50 bg-white font-bold text-black hover:bg-neutral-200"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="my-2 w-full rounded-lg border px-4 py-2 shadow focus:outline-none border-neutral-800 border-opacity-50 bg-white font-bold text-black hover:bg-neutral-200"
            >
              Register
            </button>
          </>
        )}
      </form>

      <div className="relative mb-4">
        <div className="absolute inset-0  flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <p className="bg-violet-500 px-2 text-gray-100">Or continue with</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 w-full">
        <button
          disabled={isLoading}
          className="flex flex-auto cursor-pointer select-none items-center gap-3 rounded-md bg-[#343541] py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-700"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button
          disabled={isLoading}
          className="flex flex-auto cursor-pointer select-none items-center gap-3 rounded-md bg-[#343541] py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-700"
        >
          <GitHubIcon />
          <span>Github</span>
        </button>
      </div>

      {authenticationType === "Sign In" ? (
        <>
          <p className="my-2 w-full text-center ">
            New to Chatbot?&nbsp;
            <span
              onClick={() => setAuthenticationType("Register")}
              className="decoration-from-font cursor-pointer hover:text-blue-300 hover:underline text-blue-700  "
            >
              Create a new Account
            </span>
          </p>
        </>
      ) : (
        <>
          <p
            onClick={() => setAuthenticationType("Sign In")}
            className="my-2 w-full text-center"
          >
            Already have an account.&nbsp;
            <span className="decoration-from-font text-blue-700 cursor-pointer hover:text-blue-300 hover:underline">
              Sign In
            </span>
          </p>
        </>
      )}
    </motion.div>
  );
}
