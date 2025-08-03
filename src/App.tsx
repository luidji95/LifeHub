import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { useSyncProfile } from "./hooks/useSyncProfile";
import Dashboard from "./Dashboard/dashboard";
import Authentication from "./Authentication/Auth";
import "./App.css";

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  useSyncProfile(user?.id || "", user?.email || "");

  if (loading) return <p>Loading...</p>;

  if (user) return <Dashboard />;

  return <Authentication />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}
