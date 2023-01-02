import React from "react";
import classNames from "classnames";

type Props = {};

const navbar = classNames(
    "relative z-50 flex justify-between items-center nv:px-2 h-16 py-8 shadow-sm"
);
const navLogoDiv = classNames(
    "nv-max:absolute z-behind 1030:overflow-hidden 1030:w-[3.75rem] transition-all duration-300"
);
const navLogo = classNames("h-20 w-fit min-w-fit");
const navContentDiv = classNames(
    " nv-max:absolute z-50 h-full mob:w-screen nv-max-mob:w-fullscreen nv-max:block nv-max:p-2 flex items-center transition-navbar-anime duration-1000 nv-max:bottom-20 nv-max:left-0 nv-max:bg-main "
);

const AdminHeader = (props: Props) => {
    return (
        <div className={navbar}>
            <div className={navLogoDiv}>
                <img className={navLogo} src="/images/logo.png" />
            </div>

            <div className="flex">
                <div className={navContentDiv}>
                    <div className="flex items-center space-x-2">
                        <img id="avatarButton" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src="/images/x8PhM.png" alt="" />
                        <div id="userDropdown" className="hidden z-10 w-46 bg-white rounded-md shadow-2xl">
                            <div className="py-3 px-4 text-sm text-gray-900 dark:text-black">
                                <div className="font-medium truncate">Rodin@3azma.com</div>
                            </div>
                            <ul className="py-1 text-sm text-gray-700 dark:text-black" aria-labelledby="avatarButton">
                                <li>
                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-red-600 dark:hover:text-white">Dashboard</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-red-600 dark:text-black dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                        <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
                        <div className="font-medium dark:text-black">
                            <div>Rodin Salem</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

};

export default AdminHeader;