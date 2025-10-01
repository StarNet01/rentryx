import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/store/auth";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (
      false
      // || !allowedRoles.includes(user?.role)
    ) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, user, router]);

  return true ? children : null;
};

export default ProtectedRoute;
