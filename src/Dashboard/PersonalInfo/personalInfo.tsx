import { useRef, useState, useEffect } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bucketReady, setBucketReady] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const initializeBucket = async () => {
      try {
        // Provera da li bucket postoji
        const { data: bucketData, error: bucketError } =
          await supabase.storage.getBucket("avatars");

        if (bucketError) {
          // Ako bucket ne postoji, pokušajte da ga kreirate
          const { data: createData, error: createError } =
            await supabase.storage.createBucket("avatars", {
              public: true,
              allowedMimeTypes: ["image/png", "image/jpeg", "image/gif"],
              fileSizeLimit: 50 * 1024 * 1024, // 50MB
            });

          if (createError) throw createError;
        }

        // Postavite public access ako već nije postavljeno
        const { error: updateError } = await supabase.storage.updateBucket(
          "avatars",
          {
            public: true,
          }
        );

        if (updateError)
          console.warn("Public access nije postavljen:", updateError);

        setBucketReady(true);
      } catch (error) {
        console.error("Inicijalizacija bucketa nije uspela:", error);
        setUploadError("Sistem trenutno nije dostupan. Pokušajte kasnije.");
      }
    };

    initializeBucket();
  }, []);

  const handleAvatarClick = () => {
    if (!bucketReady) {
      setUploadError(
        "Sistem se još uvek priprema. Pokušajte za nekoliko sekundi."
      );
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id || !bucketReady) return;

    setIsLoading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      // Upload fajla
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Dobijanje URL-a
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setLocalAvatar(publicUrl);

      await supabase.auth.updateUser({
        data: {
          avatarUrl: publicUrl,
        },
      });
    } catch (error) {
      console.error("Greška pri uploadu:", error);
      setUploadError(
        error instanceof Error
          ? error.message
          : "Došlo je do greške pri uploadu"
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
          disabled={isLoading || !bucketReady}
        />
      </div>

      {uploadError && (
        <div className="upload-error">
          {uploadError}
          <button onClick={() => window.location.reload()}>
            Osveži stranicu
          </button>
        </div>
      )}

      <div className="username-info">
        <span>
          {firstName} {lastName}
        </span>
        <span>@{username}</span>
      </div>

      <div className="btn-edit">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isLoading || !bucketReady}
        >
          {isLoading ? "Processing..." : "Edit profile"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
