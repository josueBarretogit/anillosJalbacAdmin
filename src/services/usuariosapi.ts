import type { Usuario, LoginResponse } from "@/interfaces/interfaces";
import { authorization, usuarioStore } from "@/variables/store";
import axios, { AxiosError } from "axios";

export default function useUsuarioApi() {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_ROUTE}usuarios`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${authorization.authorizationToken}`,
    },
    withCredentials: true,
  });

  async function logIn(
    correo: string,
    contrasena: string,
  ): Promise<LoginResponse | undefined> {
    try {
      const response = await axiosInstance.post(`login`, {
        correo,
        contrasena,
      });

      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      return err.response?.data as LoginResponse;
    }
  }

  async function logOut(): Promise<{ response: string } | undefined> {
    try {
      const response = await axiosInstance.get("logout");
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError;
      return err.response?.data as { response: string };
    }
  }

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
    } catch (error) {}
  }

  async function registrarUsuario(
    data: FormData,
  ): Promise<Usuario | AxiosError> {
    try {
      const response = await axiosInstance.post(`/register`, data);
      return response.data;
    } catch (error) {
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
      const err = error as AxiosError;
      return err;
    }
  }

  async function toggleEstadoUsuario(
    id: number,
  ): Promise<Usuario | AxiosError> {
    try {
      const response = await axiosInstance.patch(`/desactivar`, null, {
        params: {
          id: id,
        },
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }

  async function refreshAuthorizationToken(): Promise<
    string | number | undefined
  > {
    try {
      const response = await axiosInstance.get(`/refreshAuthorization`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err.status;
    }
  }

  async function getUsuarioBy(searchterm: {
    correo?: string;
    rol?: "Administrador" | "Empleado";
    estado?: boolean;
  }): Promise<Usuario | AxiosError> {
    try {
      const response = await axiosInstance.post("/getBy", searchterm, {
        headers: {
          Authorization: `Bearer ${authorization.authorizationToken}`,
        },
      });
      return response.data as Usuario;
    } catch (error) {
      return error as AxiosError;
    }
  }

  return {
    getUsuarios,
    registrarUsuario,
    actualizarUsuario,
    toggleEstadoUsuario,
    refreshAuthorizationToken,
    logIn,
    logOut,
    getUsuarioBy,
  };
}
