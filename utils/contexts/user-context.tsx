// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  email: string;
  name: string;
  userType: "free" | "initial" | "lifetime";
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const response = await fetch("/api/get-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session.user?.email }),
        });
        const data = await response.json();
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [session]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
