// types/next.d.ts
import type { NextConfig as _NextConfig } from "next";

declare module "next" {
  // extend NextConfig with turbo property (optional)
  interface NextConfig {
    turbo?: {
      disabled?: boolean;
    };
  }
}

// re-export to satisfy TS
export type NextConfig = _NextConfig & { turbo?: { disabled?: boolean } };
