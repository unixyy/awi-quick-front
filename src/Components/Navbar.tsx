import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import {getIsAdmin, isLoggedIn} from "../Middlewares/auth";

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
            <button className="mx-2.5 my-auto cursor-pointer text-sm  hover:border-orange-500 bezier-scale">
                {props.text}
            </button>
        </Link>
    );
};

export default function Navbar() {

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
                        { isLoggedIn() ? null : <StylizedLink to="/signin" text="Sign In" size="text-xl max-md:text-3xl"/> }
                    </ul>

                    { isLoggedIn() ? <UserMenu /> : null }
                </div>
            </div>
        </nav>
    );
}
