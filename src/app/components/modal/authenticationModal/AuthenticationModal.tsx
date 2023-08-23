"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useModalContext } from "@/app/services/context/ModalContext";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useRouter } from "next/navigation";

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
  const { setUser } = useGlobalContext();
  const { setIsAuthenticationModalOpen } = useModalContext();

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
    setAuthenticatingUser({
      ...authenticatingUser,
      [e.currentTarget.name]: e.currentTarget.value,
    });
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

  const register = async (e: FormEvent<HTMLFormElement>) => {
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

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    authenticationType: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (authenticationType === "Sign In") {
      logIn(e);
    } else if (authenticationType === "Register") {
      register(e);
    }
  };


  return (
    <div className="bg-white dark:bg-[#202123] rounded-lg px-8 py-2 shadow-md max-w-md w-full text-black">
      <button
        onClick={() => goBack()}
        type="button"
        className="absolute -top-50 -left-50 z-10"
      >
        <ChevronLeftIcon fontSize="large" />
      </button>

      <p className="py-4 text-4xl text-center">{authenticationType}</p>
      <form
        onSubmit={(event: FormEvent<HTMLFormElement>) =>
          handleSubmit(event, authenticationType)
        }
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
            name="email"
            value={
              authenticationType === "Sign In"
                ? authenticatingUser.email
                : registeringUser.email
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />
          <label className="p-2 text-sm font-bold ">Password</label>
          <input
            className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow  focus:outline-none text-neutral-100 "
            type="password"
            id="password"
            name="password"
            value={
              authenticationType === "Sign In"
                ? authenticatingUser.password
                : registeringUser.password
            }
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange(event)
            }
          />

          {/* Register Inputs */}
          {authenticationType === "Register" && (
            <>
              <label className="p-2 text-sm font-bold ">Repeat Password</label>
              <input
                className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                value={registeringUser.confirmPassword}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
              />
              <label className="p-2 text-sm font-bold ">Username</label>
              <input
                className="mt-2 mb-4 mx-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
                type="text"
                id="username"
                name="username"
                value={registeringUser.username}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
              />
              <div>
                <p className="p-2 text-sm font-bold ">Registration Type</p>
                <div className="flex flex-col px-4">
                  <div>
                    <input
                      className=""
                      type="radio"
                      id="basicUserRole"
                      name="userRole"
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
                      name="userRole"
                      value="PREMIUM"
                    />
                    <label
                      htmlFor="premiumUserRole"
                      className="p-2 text-sm font-bold "
                    >
                      Premium
                    </label>
                  </div>
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
    </div>
  );
}
