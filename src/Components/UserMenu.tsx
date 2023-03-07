import {UserCircleIcon} from "@heroicons/react/24/outline";
import {Link, useNavigate} from "react-router-dom";
import {getEmail, getUsername, signOut} from "../Middlewares/auth";

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
      className="block w-20 px-1 py-2 text-sm text-gray-200 hover:text-white"
    >
      {props.text}
    </Link>
  );
};

export default function UserMenu() {

  const navigate = useNavigate();

  const user = {username :getUsername(), email: getEmail()}

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
  const logout = () => {
    dropdownToggle();
    signOut();
    location.reload();
    navigate("/signin");
  }

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
                <button  onClick={() => {dropdownToggle();}}>
                  <StylizedMenuLink
                    to="/profile"
                    text="My profile"
                  />
                </button>
              </li>
              <li>
                <button type={"button"} className="" onClick={logout} >
                  <StylizedMenuLink
                    to="/"
                    text="Sign out"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  )
}