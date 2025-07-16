import classNames from "classnames";
import { useAppContext } from "../../hooks/use-app-context";

export default function Link({
  setIsSideBarVisible,
  to,
  children,
  className,
  activeClassName,
}) {
  const { navigation, currentPath } = useAppContext();

  const classes = classNames(
    "text-blue-500 dark:text-white",
    className,
    to === currentPath && activeClassName
  );

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) return;

    event.preventDefault();
    if (typeof setIsSideBarVisible === "function") {
      setIsSideBarVisible(false);
    }
    navigation(to);
  };

  return (
    <a className={classes} onClick={handleClick} href={to}>
      {children}
    </a>
  );
}
