import { useEffect } from "react";
import { useAppContext } from "../../hooks/use-app-context";

export default function ProtectedRoute({ children }) {
  const { authUser, loading, navigation } = useAppContext();

  useEffect(() => {
    if (!authUser) {
      navigation("/log-in");
    }
  }, []);

  if (loading) return <div>Loading ....</div>;

  return children;
}
