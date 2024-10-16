import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  //   redirect to dashboard callback
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl + "/dashboard";
    },
  },
};
