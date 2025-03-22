"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/modules/auth/store/auth";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const MainLayout = ({ children }: any) => {
  const { user, isAuthenticated, setAuth } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = (await HttpClient.getInstance().get(
          "checkauth"
        )) as any;

        if (response && response.data.success) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Auth Error:", error);
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isAuthenticated) verifyAuth();
  }, [router, setAuth]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  return children;
};

export default MainLayout;
