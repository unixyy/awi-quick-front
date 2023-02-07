import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface UserInfo {
  username: string;
  email: string;
}
interface LinkProps {
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
        ` ${props.size}`
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

export function Navbarv0() {
  return (
    <nav className="flex p-3 rounded bg-emerald-800 border-emerald-700">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <StylizedLink to="/" text="Festival du Jeu !" size="text-2xl" />
      </div>
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <div className="flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-transparent border-gray-700">
          <div className="container flex">
            <StylizedLink to="/games" text="Jeux" size="text-xl" />
            <StylizedLink to="/zones" text="Zones" size="text-xl" />
            <UserMenu
              username="Iusildra"
              email="lucas.nouguier@protonmail.com"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const userInfo = {
    username: "Iusildra",
    email: "lucas.nouguier@protonmail.com",
  };
  return (
    <nav className="p-3 rounded-2xl bg-emerald-800 border-emerald-700 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap items-center justify-between">
        <div className="mx-5">
          <StylizedLink to="/" text="Festival du Jeu !" size="text-2xl" />
        </div>
        {/* User menu and mobile view hamburger button */}
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mx-3 text-sm bg-emerald-800 rounded-full md:mr-0 p-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="h-10 text-white" />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-white">
                {userInfo.username}
              </span>
              <span className="block text-sm font-medium text-gray-400">
                {userInfo.email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <StylizedMenuLink to="/profile" text="My profile" />
              </li>
              <li>
                <StylizedMenuLink to="#" text="Sign out" />
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg md:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Common actions */}
        {/* Doesn't appear properly when all options are displayed, but they will never be displayed all together */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 border-l-2 border-white"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col p-4 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <StylizedLink to="/games" text="Jeux" size="text-xl" />
            </li>
            <li>
              <StylizedLink to="/zones" text="Zones" size="text-xl" />
            </li>
            <li>
              <StylizedLink to="/manage" text="Gestion" size="text-xl" />
            </li>
            <li>
              <StylizedLink to="/signin" text="Sign In" size="text-xl" />
            </li>
            <li>
              <StylizedLink to="/signup" text="Sign Up" size="text-xl" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
