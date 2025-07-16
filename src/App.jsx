import "./App.css";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "./hooks/use-app-context";
import { Menu, X } from "lucide-react";
import CarsPage from "./pages/CarsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./components/cars/HomePage";
import LogIn from "./components/ui/LogIn";
import ThemeToggle from "./components/ui/ThemeToggle";
import SideBar from "./components/navigation/Sidebar";
import classNames from "classnames";
import Register from "./components/ui/Register";
import Dashboard from "./components/users/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router";

export default function App() {
  const {
    fetchCars,
    fetchContacts,
    isLogin,
    setIsLogin,
    navigation,
    logout,
    authUser,
    currentPath,
  } = useAppContext();

  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    fetchCars();
    fetchContacts();
  }, []);

  const toggleSideBar = () => {
    setIsSideBarVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsSideBarVisible(false);
      }
    };

    if (isSideBarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarVisible]);

  const handleLogOut = async () => {
    try {
      await logout();
      setIsLogin(false);
    } catch (error) {
      console.log(`Failed to log out ${error.message}`);
    }
  };

  const isAuthPage = currentPath === "/log-in" || currentPath === "/register";

  return (
    <>
      <BrowserRouter>
        <header className="w-full sticky top-0 inset-x-0 border-b border-gray-300 z-50">
          <nav className="w-full h-14 flex items-center justify-between bg-white/30 dark:bg-indigo-950">
            <div className="flex items-center justify-center">
              {isLogin && (
                <button
                  onClick={toggleSideBar}
                  className="p-2 text-gray-400 dark:text-orange-400 cursor-pointer md:hidden"
                >
                  <Menu size={24} />
                </button>
              )}
              <button
                onClick={() => {
                  navigation("/");
                }}
                className="px-4 text-blue-500 font-bold dark:text-white cursor-pointer"
              >
                Cars App
              </button>
            </div>
            <div className="flex gap-3">
              {isLogin ? (
                <>
                  <p className="dark:text-white">
                    Welcome <span>{authUser.email}</span>
                  </p>
                  <button
                    onClick={handleLogOut}
                    className="px-4 text-blue-500 font-bold dark:text-white cursor-pointer"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigation("/log-in");
                    }}
                    className="px-4 text-blue-500 font-bold dark:text-white cursor-pointer"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigation("/register");
                    }}
                    className="px-4 text-blue-500 font-bold dark:text-white cursor-pointer"
                  >
                    Register
                  </button>
                </>
              )}

              <ThemeToggle className="border-0 dark:text-white" />
            </div>
          </nav>
        </header>

        <div className="p-1 dark:bg-indigo-950">
          <Routes>
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {!isAuthPage && (
            <div className="flex gap-3 xl:gap-6">
              <div className="relative shrink-0">
                <div
                  ref={sideBarRef}
                  className={classNames(
                    "md:hidden fixed left-0 w-64 h-full shadow-lg bg-white dark:shadow-orange-500 transition-transform duration-500 z-50",
                    isSideBarVisible
                      ? "translate-x-0"
                      : "-translate-x-full shadow-none"
                  )}
                >
                  <button
                    className="absolute top-0 right-0 p-2 text-gray-400 dark:text-orange-400 cursor-pointer block md:hidden"
                    onClick={toggleSideBar}
                  >
                    {isSideBarVisible && <X size={18} />}
                  </button>
                  <SideBar
                    setIsSideBarVisible={setIsSideBarVisible}
                    className="pl-4 pt-8 pr-8"
                  />
                </div>
                {isLogin && (
                  <SideBar className="hidden md:flex p-4 sm:w-40 lg:w-48 xl:w-64 shadow-lg" />
                )}
              </div>

              {/* MAIN CONTENT */}
              <div className="h-svh flex-1 self-center p-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cars" element={<CarsPage />} />
                  <Route path="/contacts" element={<ContactPage />} />
                </Routes>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
