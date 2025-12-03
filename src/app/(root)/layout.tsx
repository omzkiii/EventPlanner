import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../../assets/globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "../../components/providers/provider";
import { APP_DESC, APP_NAME, SERVER_URL } from "@/lib/constants";


const inter = Inter({subsets: ['latin']});


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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
