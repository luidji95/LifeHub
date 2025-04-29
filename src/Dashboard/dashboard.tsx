import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Navbar from "./Navigation/navigation";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <Navbar username={user.username || user.email} />
      <div>
        <h1>Welcome to LifeHub Dashboard! 🚀</h1>
      </div>
    </>
  );
}
