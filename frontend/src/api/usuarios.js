import { isAxiosError } from "axios";
import api from "../config/axios.js";

export const getUser = async () => {
  try {
    const { data } = await api("/auth/user", );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al obtener el usuario",
      );
    }
    throw error;
  }
};
