import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import routingPath from "../routing/Router_Path";

interface FormData {
  login: string;
  password: any;
}

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await postQuestion(formData);
      if (response.ok) {
        console.log("Login successfully!");
      } else {
        console.log("Failed to Login.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const postQuestion = async (payload: FormData) => {
    try {
      const response = await fetch("https://banking-app-server.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data >>>", data);
        const token = data.token;
        const id = data.id;
        sessionStorage.setItem("jwtToken", token);
        sessionStorage.setItem("id", id);
        navigate(routingPath.home);
      } else {
        console.log("Failed to login.");
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white bg-opacity-80  rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="mb-4 text-center text-2xl font-extrabold text-black dark:text-white md:text-2xl lg:text-3xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                My
              </span>{" "}
              Bank
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  id="login"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>
              <button
                type="submit"
                className=" w-full text-white bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
