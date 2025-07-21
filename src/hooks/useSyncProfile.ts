// hooks/useSyncProfile.ts
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../supabaseClient";
import { saveUser } from "../store/userSlice";

export const useSyncProfile = (userId: string, email: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || !email) return;

    const fetchProfile = async () => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile && !error) {
        dispatch(
          saveUser({
            id: userId,
            email,
            username: profile.username,
            firstName: profile.first_name,
            lastName: profile.last_name,
            avatarUrl: profile.avatar_url,
            bio: profile.bio,
          })
        );
      }
    };

    fetchProfile();
  }, [userId, email, dispatch]);
};
