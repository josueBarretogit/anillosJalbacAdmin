import type { Anillo, Login } from "@/interfaces/interfaces";
import axios, { AxiosError } from "axios";

const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/usuarios",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

async function getUsuarios(): Promise<Anillo[] | undefined> {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getUsuarios };
