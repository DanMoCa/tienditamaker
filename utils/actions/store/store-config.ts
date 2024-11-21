"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getStoreConfigByUser(userId: any) {
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
      .from("Store")
      .select()
      .eq("userId", userId);

    if (error?.code) return error;

    return data![0];
  } catch (error: any) {
    return error;
  }
}

export async function updateStoreConfig(userId: any, config: any) {
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
    // Primero, verificar si el subdominio ya existe para otra tienda
    if (config.subdomain) {
      const { data: existingStore, error: subdomainError } = await supabase
        .from("Store")
        .select("id")
        .eq("subdomain", config.subdomain)
        .neq("userId", userId);

      if (subdomainError) return subdomainError;

      // Si ya existe un subdominio para otro usuario, retornar un error
      if (existingStore && existingStore.length > 0) {
        return {
          code: "SUBDOMAIN_EXISTS",
          message: "El subdominio ya está en uso por otra tienda",
        };
      }
    }

    // Si no hay conflicto de subdominio, proceder con la actualización
    const { error } = await supabase
      .from("Store")
      .upsert({ userId, ...config });

    if (error?.code) return error;

    return null;
  } catch (error: any) {
    return error;
  }
}

export async function getProductsByStoreId(storeId: any) {
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
      .select()
      .eq("storeId", storeId);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getProductById(productId: any) {
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
      .select()
      .eq("id", productId);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getStoreIdByDomain(domain: any) {
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
      .from("Store")
      .select("id")
      .eq("subdomain", domain);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getStoreIdByUser(userId: number) {
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
      .from("Store")
      .select("id")
      .eq("userId", userId);

    if (error?.code) return error;

    return data![0].id;
  } catch (error: any) {
    return error;
  }
}
