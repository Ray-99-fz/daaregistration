/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Base URL for the registration payment API (e.g. http://localhost:3000). */
  readonly VITE_PAYMENT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
