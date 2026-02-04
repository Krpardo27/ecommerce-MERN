import api from "../config/axios";

export const getAdminProfile = async () => {
  const { data } = await api.get("/admin/profile");
  return data.admin;
};
