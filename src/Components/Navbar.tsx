import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { volunteerDto } from "../dto/volunteer.dto";

interface UserInfo {
    username: string;
    email: string;
}
interface LinkProps {
    className?: string;
    to: string;
    text: string;
    size?: string;
}

const StylizedLink = (props: LinkProps) => {
    return (
        <Link
            to={props.to}
            className={
                "my-auto cursor-pointer hover:text-orange-500 bezier-scale block" +
                ` ${props.size}` +
                ` ${props.className}`
            }
        >
            {props.text}
        </Link>
    );
};

const StylizedMenuLink = (props: LinkProps) => {
    return (
        <Link
            to={props.to}
            className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
        >
            {props.text}
        </Link>
    );
};

const StylizedButton = (props: LinkProps) => {
    return (
        <Link to={props.to}>
            <button className="mx-2.5 my-auto cursor-pointer text-sm  hover:border-orange-500 bezier-scale">
                {props.text}
            </button>
        </Link>
    );
};

const UserMenu = (userInfo: UserInfo) => {
    return <div></div>;
};

export default function Navbar() {
    const toggle = () => {
        const menu = document.getElementById("mobile-menu-2");
        const principal = document.getElementById("principal");
        if (menu) {
            if (menu.classList.contains("max-md:hidden")) {
                menu.classList.remove("max-md:hidden");
                setToggled(true);
                if (principal) {
                    principal.classList.add("flex-wrap");
                }
            } else {
                menu.classList.add("max-md:hidden");
                setToggled(false);
                if (principal) {
                    principal.classList.remove("flex-wrap");
                }
            }
        }
    };
    const user: volunteerDto = JSON.parse(String(localStorage.getItem("user")));
    const [isToggled, setToggled] = useState(false);
    const userInfo = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
    };
    return (
        <nav className="p-3 rounded-xl bg-maroon-palet border-emerald-700 px-10 sm:px-4 py-2.5 mb-10">
            <div
                id="principal"
                className="container flex  mx-5 items-center justify-between"
            >
                <div className="mx-5 mr-auto contents">
                    <StylizedLink
                        to="/"
                        text="Festival du Jeu !"
                        size="text-2xl"
                    />
                </div>

                {/* Common actions */}
                {/* Doesn't appear properly when all options are displayed, but they will never be displayed all together */}
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-2">
                    <ul
                        id="mobile-menu-2"
                        className="flex flex-col p-4 mt-4 rounded-lg my-auto md:flex-row md:space-x-8 md:mt-0 max-md:hidden"
                    >
                        <li>
                            <StylizedLink
                                to="/games"
                                text="Jeux"
                                size="text-xl"
                            />
                        </li>
                        <li>
                            <StylizedLink
                                to="/zones"
                                text="Zones"
                                size="text-xl"
                            />
                        </li>
                        <li>
                            <StylizedLink
                                to="/manage"
                                text="Gestion"
                                size="text-xl"
                            />
                        </li>
                        <li>
                            <StylizedLink
                                to="/signin"
                                text="Sign In"
                                size="text-xl"
                            />
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className="flex items-center mr-5 md:order-2 max-md:ml-auto">
                                <button
                                    type="button"
                                    className="flex text-sm bg-maroon-palet rounded-full md:mr-0 p-0"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <UserCircleIcon className="h-10 text-white" />
                                </button>
                                <div
                                    className="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600"
                                    id="user-dropdown"
                                >
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-white">
                                            {userInfo.name}
                                        </span>
                                        <span className="block text-sm font-medium text-gray-400">
                                            {userInfo.email}
                                        </span>
                                    </div>
                                    <ul
                                        className="py-2"
                                        aria-labelledby="user-menu-button"
                                    >
                                        <li>
                                            <StylizedMenuLink
                                                to="/profile"
                                                text="My profile"
                                            />
                                        </li>
                                        <li>
                                            <StylizedMenuLink
                                                to="#"
                                                text="Sign out"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={toggle}
                                    type="button"
                                    className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg md:hidden"
                                    aria-controls="mobile-menu-2"
                                    aria-expanded="false"
                                >
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <Hamburger
                                        direction="right"
                                        toggled={isToggled}
                                    />
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
