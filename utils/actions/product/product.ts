"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface ProductData {
  name: string;
  description: string;
  price: string;
  images: any;
  storeId: number;
  providerProductId: number;
}

export async function setNewProduct(productData: ProductData) {
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
    const { data, error } = await supabase.from("Product").insert(productData);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getProducts(storeId: number) {
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
      .from("Product")
      .select(
        `
        *,
        providerProduct:providerProductId (
          id,
          price
        )
      `
      )
      .eq("storeId", storeId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function updateProduct(
  productData: ProductData,
  productId: number
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
      .from("Product")
      .update(productData)
      .eq("id", productId);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function deleteProduct(productId: number) {
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
    const { error } = await supabase
      .from("Product")
      .delete()
      .eq("id", productId);

    if (error?.code) return error;

    return null;
  } catch (error: any) {
    return error;
  }
}
