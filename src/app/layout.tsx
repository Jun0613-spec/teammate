import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import JotaiProvider from "@/components/providers/jotai-provider";

import Modals from "@/components/modals";

import { Toaster } from "react-hot-toast";

const font = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teammate",
  description: "Team messenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={font.className}>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <JotaiProvider>
                <Toaster
                  position="bottom-right"
                  gutter={8}
                  toastOptions={{
                    className: "text-sm",
                    duration: 2000,
                  }}
                />
                <Modals />
                {children}
              </JotaiProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
