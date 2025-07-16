import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./Button";
import classNames from "classnames";

export default function ThemeToggle({ className }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      root.classList.add("dark");
      setDark(true);
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const dark = root.classList.contains("dark");

    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <div>
      <Button
        onClick={toggleTheme}
        className={classNames(
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          className
        )}
      >
        {dark ? (
          <MoonIcon className="w-4 h-4" />
        ) : (
          <SunIcon className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
