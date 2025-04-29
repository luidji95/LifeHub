import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { logoutUser } from "../store/userSlice";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to LifeHub Dashboard! 🚀</h1>
      <p>Hello, {user.username ? user.username : user.email}!</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#d73a49",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
