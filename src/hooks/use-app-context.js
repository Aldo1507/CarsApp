import { useContext } from "react";
import AppContext from "../context/appContext";

function useAppContext() {
  return useContext(AppContext);
}

export { useAppContext };
