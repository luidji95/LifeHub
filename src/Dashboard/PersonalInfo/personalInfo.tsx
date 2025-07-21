import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./personalInfo.css";
import { supabase } from "../../supabaseClient";

interface Props {
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

const PersonalInfo = ({ username, firstName, lastName, avatarUrl }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !user.id) {
      setUploadError("Invalid file or user not found.");
      return;
    }

    setIsLoading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setLocalAvatar(publicUrl);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Greška pri uploadu"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="personal-info-main">
      <div className="avatar-wrapper">
        <img
          src={localAvatar || avatarUrl || "/placeholder-avatar.png"}
          alt="User Avatar"
          className="avatar"
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </div>

      {uploadError && <p className="upload-error">{uploadError}</p>}

      <div className="username-info">
        <span>
          {firstName} {lastName}
        </span>
        <span>@{username}</span>
      </div>

      <div className="btn-edit">
        <button onClick={() => {}} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Edit profile"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
