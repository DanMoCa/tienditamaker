// TODO: FIX THIS FILE TO USE THE CORRECT USER TYPE
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserDataByEmail } from "../actions/session/user";

interface UserContextType {
  userType: "free" | "initial" | "lifetime" | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [userType, setUserType] = useState<
    "free" | "initial" | "lifetime" | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (session) {
        const user = await getUserDataByEmail(session.user?.email as string);
        if (user) {
          setUserType(user.userType as "free" | "initial" | "lifetime");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [session, status]);

  return (
    <UserContext.Provider value={{ loading, userType }}>
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
