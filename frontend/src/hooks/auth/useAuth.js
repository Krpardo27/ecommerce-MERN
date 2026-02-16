import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../api/auth";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = async (formData) => {
    const { token } = await loginApi(formData);

    localStorage.setItem("AUTH_TOKEN", token);

    await queryClient.invalidateQueries(["auth", "me"]);

    const me = await queryClient.fetchQuery({
      queryKey: ["auth", "me"],
    });

    if (me?.user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  };

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.clear();
    navigate("/auth/login");
  };

  const getToken = () => localStorage.getItem("AUTH_TOKEN");

  return {
    login,
    logout,
    getToken,
  };
};
