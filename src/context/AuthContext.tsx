import { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../supabaseClient";
import { useDispatch } from "react-redux";
import { saveUser, logoutUser } from "../store/userSlice";

// TYPES
type User = {
  email: string;
  id: string;
} | null;

interface AuthContextType {
  user: User;
  loading: boolean;
}

// CONTEXT
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// PROVIDER
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
        setUser(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const userId = session.user.id;
        const email = session.user.email!;
        setUser({ email, id: userId });
        await syncProfile(userId, email);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          dispatch(logoutUser());
          return;
        }

        if (session?.user) {
          const userId = session.user.id;
          const email = session.user.email!;
          setUser({ email, id: userId });

          // Check if profile already exists
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle();

          if (!profile) {
            // Attempt to use localStorage draft if exists
            const draft = JSON.parse(
              localStorage.getItem("registrationDraft") || "{}"
            );

            await supabase.from("profiles").insert({
              id: userId,
              first_name: draft.first_name || "",
              last_name: draft.last_name || "",
              username: draft.username || "",
              avatar_url: draft.avatar_url || null,
              bio: draft.bio || "",
            });

            localStorage.removeItem("registrationDraft");
          }

          await syncProfile(userId, email);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  const syncProfile = async (userId: string, email: string) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !profile) {
      console.warn("Profile fetch failed:", error);
      return;
    }

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
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
