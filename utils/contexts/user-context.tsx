import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserDataByEmail } from "../actions/session/user";

// Define tipos explícitos
type UserType = "free" | "initial" | "lifetime";

interface User {
  id: string;
  email: string;
  userType: UserType;
  name?: string;
  // Añade aquí otros campos que necesites del usuario
}

interface UserContextState {
  user: User | null;
  userType: UserType | null;
  loading: boolean;
  error: Error | null;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextState | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  // Añade opciones de configuración si las necesitas
  options?: {
    refreshInterval?: number;
  };
}> = ({ children, options = {} }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Función para obtener datos del usuario
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      if (session?.user?.email) {
        const userData = await getUserDataByEmail(session.user.email);

        if (userData) {
          setUser(userData);
          setUserType(userData.userType as UserType);
        } else {
          setUser(null);
          setUserType(null);
        }
      } else {
        setUser(null);
        setUserType(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Error fetching user data")
      );
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar datos iniciales
  useEffect(() => {
    if (status === "loading") return;

    fetchUser();
  }, [session?.user?.email, status]);

  // Efecto opcional para recargar datos periódicamente
  useEffect(() => {
    if (!options.refreshInterval) return;

    const interval = setInterval(fetchUser, options.refreshInterval);
    return () => clearInterval(interval);
  }, [options.refreshInterval]);

  const value = {
    user,
    userType,
    loading,
    error,
    refetchUser: fetchUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook personalizado con tipado fuerte
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

// Hook de utilidad para casos donde necesitas asegurar que el usuario está autenticado
export const useAuthenticatedUser = () => {
  const { user, loading, error } = useUser();

  if (!loading && !user && !error) {
    throw new Error("User is not authenticated");
  }

  return { user: user!, loading, error };
};
