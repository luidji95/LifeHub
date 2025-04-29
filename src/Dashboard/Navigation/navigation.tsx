import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { logoutUser } from "../../store/userSlice";
import { supabase } from "../../supabaseClient";
import { FiLogOut } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import Input from "../../Components/UI/Input";
import IconButton from "../../Components/UI/IconButton";

interface Props {
  username: string;
}

export default function Navbar({ username }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <div className="navbar-block-left">
          <div className="hamburger-wrapper">
            <HiMenu className="hamburger-icon" />
          </div>

          <img src="/lifehub-logo.png" alt="LifeHub" className="logo-navbar" />
          <span className="username">{username}!</span>
        </div>
        <div className="navbar-block-right">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <Input
              className="search-input"
              type="text"
              placeholder="Put [ / ] to search..."
            />
          </div>

          <IconButton
            icon={<FiLogOut />}
            text="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="navbar-overview">
        <div className="overiview-link">Overview</div>
      </div>

      {/* <div className="navbar-left">
        <div className="navbar-block-left">
          <button className="hamburger">☰</button>
          <img src="/lifehub-logo.png" alt="LifeHub" className="logo-navbar" />
          <span className="username">{username}!</span>
        </div>
        <div className="overview-link">Overview</div>
      </div>
      <div className="navbar-right">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div> */}
    </nav>
  );
}
