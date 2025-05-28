import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Navbar from "./Navigation/navigation";
import PersonalInfo from "./PersonalInfo/personalInfo";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <Navbar username={user.username || user.email} />
      <div>
        <PersonalInfo
          username={user.username || ""}
          firstName={user.firstName || ""}
          lastName={user.lastName || ""}
          avatarUrl={""}
        />
      </div>
    </>
  );
}
