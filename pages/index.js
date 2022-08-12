import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetUser, useUser } from "../components/auth";

function Login() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const setUser = useSetUser();
  const user = useUser();
  const [error, setError] = useState("");
  if (user) {
    router.push(router.query.next ?? "/admin/dashboard/");
  }
  function submit(e) {
    e.preventDefault();
    axios
      .post("/api/login/", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then(function (response) {
        setUser(response.data);
        router.push(router.query.next ?? "/admin/dashboard/");
      })
      .catch(function (err) {
        setError(err);
      });
  }
  return (
    <div className="h-screen max-w-7xl mx-auto">
      <div className="px-6 h-full text-gray-800">
        <div className="flex justify-between items-center h-full">
          <div className="w-64">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full object-cover"
              alt="Sample image"
            />
          </div>

          <form className="w-72" onSubmit={submit}>
            <p className="text-3xl mb-8 font-semibold uppercase">
              sun'iy idrok
            </p>
            <div className="mb-6">
              <input
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Username"
                name="username"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                name="password"
                autoComplete="on"
              />
            </div>

            {error && (
              <span className="text-red-600">
                {error.response.status === 400
                  ? "Incorrect username or password"
                  : "Bad network connection"}
              </span>
            )}

            <div className="text-center mt-12 lg:text-left">
              <input
                type="submit"
                className="inline-block px-7 py-3 bg-lightBlue-600 text-white font-medium text-sm uppercase rounded cursor-pointer"
                value={"kirish"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
