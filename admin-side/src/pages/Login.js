import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = "http://localhost:3000";

export default function Login(props) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (event) => {
    const { name, value } = event.target;

    const newForm = {
      ...form,
    };
    newForm[name] = value;

    setForm(newForm);
  };
  console.log(form);
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, form);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src="https://clipground.com/images/png-tracking-1.png" alt="Your Company" />
        <h2 className="mt-4 text-center text-2xl font-semibold font-serif text-gray-700">TrackWise</h2>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitForm} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                onChange={changeInputHandler}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={changeInputHandler}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#4169E1] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">Copyright 2023 © TrackWise | Developed by MJRA</p>
      </div>
    </div>
  );
}
