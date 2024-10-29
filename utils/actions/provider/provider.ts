"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface ProviderData {
  name: string;
  description: string;
  image: any;
}

interface ProductData {
  name: string;
  description: string;
  price: string;
  images: any;
}

export async function setNewProvider(providerData: ProviderData) {
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
    const { data, error } = await supabase
      .from("Provider")
      .insert(providerData);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getProviders() {
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
    const { data, error } = await supabase.from("Provider").select();

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function setNewProduct(
  providerId: number,
  productData: ProductData
) {
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
    const { data, error } = await supabase
      .from("ProviderProduct")
      .insert({ ...productData, providerId: providerId });

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}
