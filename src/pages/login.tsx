import router from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaLinkedin,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

interface IFormInput {
  email: String;
  password: String;
}

export default function login() {
  // ローカルのAPIを呼び出す処理
  const login = async function (data: IFormInput) {
    const tokenResponse = await fetch(
      "http://localhost:8090/sanctum/csrf-cookie",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const token = document.cookie.match(
      new RegExp("XSRF-TOKEN" + "=([^;]*);*")
    )!![1];

    const response = await fetch("http://localhost:8090/api/i/flow/login", {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    // ログイン成功の場合は遷移する
    if(response.status == 200) {
      const user: Promise<IFormInput> = response.json()
      router.push('/top/')
    }

    console.log(response);
    return response;
  };

  // handleSubmit の
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    const response = login(data);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 text-black">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-left font-bold">
                <span className="text-green-500">Company</span>Name
              </div>
              <div className="py-10">
                <h2 className="text-3xl font-bold text-green-500 mb-2">
                  Sign in to Account
                </h2>
                <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                <div className="flex justify-center my-2">
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaLinkedin className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGoogle className="text-sm" />
                  </a>
                </div>
                <p className="text-gray-400 my-3">or use your email account</p>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gary-400 m-2" />
                    <input
                      type="email"
                      // name="email"
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      {...register("email")}
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gary-400 m-2" />
                    <input
                      type="password"
                      // name="password"
                      placeholder="password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      {...register("password")}
                    />
                  </div>
                  <div className="flex justify-between w-64 mb-5">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs">
                      Forhot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:text-white hover:bg-green-500 "
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start jorney with us
            </p>
            <button className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              Sign Up
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
