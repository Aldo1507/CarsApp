import classNames from "classnames";
import { useAppContext } from "../../hooks/use-app-context";
import { NavLink } from "react-router";

export default function SideBar({ setIsSideBarVisible, className }) {
  const { isLogin } = useAppContext();

  const classes = classNames(
    "flex flex-col items-start gap-2 h-svh p-2 text-sm md:text-base border-r-3 border-slate-400 dark:border-indigo-900 dark:bg-indigo-950",
    className
  );

  const links = [
    { lable: "Home", path: "/" },
    { lable: "Dashboard", path: "/dashboard" },
    { lable: "Cars", path: "/cars" },
    { lable: "Contacts", path: "/contacts" },
  ];

  const renderLinks = links.map((link) => {
    return (
      <NavLink
        key={link.lable}
        to={link.path}
        className={({ isActive }) =>
          isActive
            ? "mb-3 font-bold text-orange-500 px-4 py-1 rounded-full bg-slate-300 dark:bg-indigo-700 dark:text-orange-500"
            : "mb-3 dark:text-white "
        }
      >
        {link.lable}
      </NavLink>
    );
  });

  return <div className={classes}>{isLogin && renderLinks}</div>;
}
