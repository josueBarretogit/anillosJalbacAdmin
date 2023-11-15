import type { Usuario, LoginResponse } from "@/interfaces/interfaces";
import { usuarioStore } from "@/variables/store";
import axios, { AxiosError } from "axios";

const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/usuarios",
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

async function getUsuarios(): Promise<Usuario[] | undefined> {
  try {
    const response = await axiosInstance.get("/");
    const filteredUsuarios: Usuario[] = response.data.filter(
      (usuario: Usuario) =>
        usuario.correo != usuarioStore.UsuarioInterface.correo,
    );
    return filteredUsuarios.sort((a: Usuario, b: Usuario) =>
      a.estado === b.estado ? 0 : a.estado ? -1 : 1,
    );
  } catch (error) {
    console.log(error);
  }
}

async function registrarUsuario(data: FormData): Promise<Usuario | AxiosError> {
  try {
    const response = await axiosInstance.post(`/register`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}

async function actualizarUsuario(
  data: FormData,
  id: number,
): Promise<Usuario | AxiosError> {
  try {
    const response = await axiosInstance.put(`/editar`, data, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}

async function toggleEstadoUsuario(id: number): Promise<Usuario | AxiosError> {
  try {
    const response = await axiosInstance.patch(`/desactivar`, null, {
      params: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}

export {
  getUsuarios,
  registrarUsuario,
  actualizarUsuario,
  toggleEstadoUsuario,
};
