"use client";
import { useEffect, useState } from "react";
import dbConnect from "@/config/database";
import User from "@/models/user";
import { useSession } from "next-auth/react";

const useProfile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      // Validar si existe la sesión
      if (session) {
        if (session.user?.email) {
          await dbConnect();
          const userProfile = await User.findOne({ email: session.user.email }); // Buscar el perfil por email
          setProfile(userProfile);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, [session]);

  return { profile, loading };
};

export default useProfile;
