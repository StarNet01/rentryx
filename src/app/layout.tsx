import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/modules/share/assets/Theme";
import { Toaster } from "react-hot-toast";
import MainLayout from "@/modules/auth/components/AuthLayout";

export const metadata: Metadata = {
  title: "Rent RYX",
  description: "Rent Vehicle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <MainLayout>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </MainLayout>
          <div>
            <Toaster />
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
