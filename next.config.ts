import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_anon_key || "",
    supabase_url: process.env.supabase_url || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabase_anon_key: process.env.supabase_anon_key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  },
};

export default nextConfig;
