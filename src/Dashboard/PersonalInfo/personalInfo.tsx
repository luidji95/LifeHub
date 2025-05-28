import "./personalInfo.css";

interface Props {
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

const PersonalInfo = ({ username, firstName, lastName, avatarUrl }: Props) => {
  return (
    <div className="personal-info-main">
      {/* Avatar slika */}
      <div className="avatar-wrapper">
        <img
          src={avatarUrl ? avatarUrl : "/placeholder-avatar.png"}
          alt="User Avatar"
          className="avatar"
        />
      </div>

      {/* Ime, Prezime, Username */}
      <div className="username-info">
        <span>
          {firstName} {lastName}
        </span>
        <span>@{username}</span>
      </div>

      {/* Opis */}
      <div className="user-description">
        <p>Description</p>
      </div>

      {/* Dugme za edit */}
      <div className="btn-edit">
        <button>Edit profile</button>
      </div>

      {/* Linkovi ili povezane sekcije */}
      <div className="user-links-related"></div>
    </div>
  );
};

export default PersonalInfo;
