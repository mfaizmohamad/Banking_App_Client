import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routingPath from "../routing/Router_Path";
import { errorListner, inputError } from "../utils/Input_error";
import HeaderAuth from "../component/HeaderAuth";
import { MdLockOutline } from "react-icons/md";

interface FormData {
  login: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUsernameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    const apiUrl = import.meta.env.VITE_API_BASE_URL + "/api/auth/login";
    try {
      const response = await fetch(apiUrl, {
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
        setInvalid(true);
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    errorListner();
  }, []);

  const loginUsername = formData.login

  return (
    <section className="custom-bg bg-cover bg-center bg-no-repeat h-screen">
      <HeaderAuth />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 mt-[-15rem] space-y-4 md:space-y-6 sm:p-8">
            {invalid && (
              <div className="flex justify-center mb-5 mt-[-5rem]">
                <div className="bg-[#f8d7da] text-center text-red-700 w-[24rem] py-5 rounded-md">
                  <p>Invalid username or password.</p>
                </div>
              </div>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleUsernameSubmit}
              onInvalid={(e) => {
                inputError(e);
              }}
            >
              <div className="flex">
                <div>
                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                    required
                    error-required={"Please insert username"}
                    id="login"
                    className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-4"
                    placeholder="My Username"
                  />
                </div>
                <button
                  type="submit"
                  className="h-[3.3rem] flex text-black bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <MdLockOutline className="mr-2 text-[1.5rem]" />
                  <span className="inline-block mt-1">LOGIN</span>
                </button>
              </div>
            </form>

            {isModalOpen && (
              <div
                id="authentication-modal"
                aria-hidden="true"
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
              >
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative w-[50rem] h-[30rem] ml-[-10rem] opacity-95 bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Please insert your password
                      </h3>
                      <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <h1 className="text-center text-lg mt-10"><span className="font-bold">Hello</span> {loginUsername} !</h1>
                    <div className="p-4 md:p-5 flex justify-center mt-[5rem]">
                      <form
                        className="space-y-4 md:space-y-6"
                        onSubmit={handlePasswordSubmit}
                        onInvalid={(e) => {
                          inputError(e);
                        }}
                      >
                        <div className="bg-white flex ">
                          <div>
                            <input
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              error-required={"Please insert password"}
                              id="password"
                              placeholder="Password"
                              className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                            />
                          </div>
                          <button
                            type="submit"
                            className="h-[3rem] flex text-black bg-yellow-400 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                            <MdLockOutline className="mr-2 text-[1.5rem]" />
                            <span className="inline-block mt-1">LOGIN</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
