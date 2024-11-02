"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";

export default function Component() {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[350px] mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">iniciar sesión</CardTitle>
          <CardDescription>
            usa tu cuenta de Google para acceder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            variant="outline"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="mr-2 h-4 w-4" />
            iniciar sesión con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
