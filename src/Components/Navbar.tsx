import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import {getIsAdmin, isLoggedIn} from "../Middlewares/auth";
import {useState} from "react";
import Hamburger from "hamburger-react";

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

const StylizedButton = (props: LinkProps) => {
    return (
        <Link to={props.to}>
            <button className=" my-auto cursor-pointer text-sm  hover:border-orange-500 bezier-scale">
                {props.text}
            </button>
        </Link>
    );
};

export default function Navbar() {
    const [isToggled, setToggled] = useState(false);

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

    return (
        <nav className="p-3 rounded-xl bg-maroon-palet border-emerald-700 px-10 sm:px-4 py-2.5 mb-5">
            <div
                id="principal"
                className="container flex flex-row flex-wrap md:mx-5 items-center justify-between max-md:ml-auto max-md:mr-auto"
            >
                <div className="mx-5 mr-auto contents">
                    <StylizedLink
                        to="/"
                        text="Festival du Jeu !"
                        size="text-2xl max-md:text-4xl"
                    />
                </div>

                {/* Common actions */}
                {/* Doesn't appear properly when all options are displayed, but they will never be displayed all together */}
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-2">
                    <ul
                        id="mobile-menu-2"
                        className="flex flex-col align-center p-4 mt-4 rounded-lg my-auto md:flex-row md:space-x-8 md:mt-0 max-md:hidden"
                    >
                        <li>
                            <StylizedLink
                                to="/games"
                                text="Jeux"
                                size="text-xl max-md:text-3xl"
                            />
                        </li>
                        <li>
                            <StylizedLink
                                to="/zones"
                                text="Zones"
                                size="text-xl max-md:text-3xl"
                            />
                        </li>
                        {getIsAdmin() ? <StylizedLink
                          to="/manage"
                          text="Manage"
                          size="text-xl max-md:text-3xl"
                        /> : null}
                        <div className={"space-x-2"}>
                            { isLoggedIn() ? null :<StylizedButton to="/signin" text="Sign In" /> }
                            { isLoggedIn() ? null :<StylizedButton to="/signup" text="Sign Up" /> }
                        </div>
                    </ul>
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
                    {isLoggedIn() ? <UserMenu /> : null }
                </div>
            </div>
        </nav>
    );
}
