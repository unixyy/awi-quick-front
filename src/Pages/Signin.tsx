import React from "react";
import { signInRoot } from "../routes/routes";
import axios from "axios";
import Cookies from "js-cookie";

export default function Signin() {
  const [volunteer, setVolunteer] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolunteer({
      ...volunteer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(volunteer);

    axios.post(signInRoot, volunteer).then(function (response) {
      console.log(response);
      Cookies.set("token", response.data.access_token, { expires: 7 });
      console.log(Cookies.get("token"));
      axios.defaults.headers["Authorization"] =
        "Bearer " + Cookies.get("token");
      location.reload();
    });
  };

  return (
    <div>
      <div className="flex text-5xl flex-nowrap font-bold ml-20 my-5 justify-start maroon-palet">
        Sign Up
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col auto-cols-fr flex-wrap space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-left maroon-palet">
              Email
            </label>
            <input
              type="email"
              className="rounded dark:text-white p-2 w-48"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-left maroon-palet">
              Password
            </label>
            <input
              type="password"
              className="rounded dark:text-white p-2 w-48"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-max text-white bg-maroon-palet">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
