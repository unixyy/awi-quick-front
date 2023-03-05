import {UserCircleIcon} from "@heroicons/react/24/outline";
import Hamburger from "hamburger-react";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getEmail, getUsername, isLoggedIn, signOut} from "../Middlewares/auth";

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

export default function UserMenu() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    }, [loggedIn])

  const navigate = useNavigate();
  const logout = () => {
    signOut();
    setLoggedIn(false);
    location.reload();
    navigate("/signin");
  }

  const user = {username :getUsername(), email: getEmail()}
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

  const dropdownToggle = () => {
    const menu = document.getElementById("user-dropdown");
    if (menu) {
      if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
      } else {
        menu.classList.add("hidden");
      }
    }
  }

  const [isToggled, setToggled] = useState(false);

  const userInfo = {
    name: user.username,
    email: user.email,
  };
  return (
    <ul>
      <li>
        <div className="flex items-center mr-5 order-2 flex-row-reverse max-md:ml-auto">
          <button
            type="button"
            className="flex text-sm bg-maroon-palet rounded-full md:mr-0 p-0"
            id="user-menu-button"
            aria-expanded="false"
            onClick={dropdownToggle}
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
                <button type={"button"} className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white" onClick={logout} > Sign Out </button>
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
  )
}