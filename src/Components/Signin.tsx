import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    };

    const navigate = useNavigate();
    useEffect(() => {
        console.log("entering useEffect");
        if (localStorage.getItem("user") !== null) {
            console.log("redirecting");
            navigate("../");
        }
    });

    return (
        <div>
            <div className="flex text-5xl flex-nowrap font-bold ml-20 my-5 justify-start">
                Sign Up
            </div>
            <div className="flex justify-center">
                <form
                    className="flex flex-col auto-cols-fr flex-wrap space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-left">
                            Email
                        </label>
                        <input
                            type="email"
                            className="rounded text-black"
                            name="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-left">
                            Password
                        </label>
                        <input
                            type="password"
                            className="rounded text-black"
                            name="password"
                            id="password"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="w-max bg-maroon-palet">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
