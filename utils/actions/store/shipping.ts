"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function saveAddressToDatabase(addressData: any) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase.from("Address").insert(addressData);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}
