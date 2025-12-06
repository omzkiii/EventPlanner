import type { Metadata } from "next";
import "../../assets/globals.css";
import { APP_DESC, APP_NAME, SERVER_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | Event`,
    default: APP_NAME
  },
  description: APP_DESC,
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
