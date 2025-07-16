import { useAppContext } from "../../hooks/use-app-context";

export default function Route({ path, children }) {
  const { currentPath } = useAppContext();

  if (currentPath === path) {
    return children;
  }

  return null;
}
