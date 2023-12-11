import type { Anillo, LoginResponse, Solitario } from "@/interfaces/interfaces";
import { authorization } from "@/variables/store";
import axios, { AxiosError } from "axios";

export default function useAnillosApi() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/",

    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${authorization.authorizationToken}`,
    },
    withCredentials: true,
  });

  const axiosInstanceJson = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      hola: "hola",
      Authorization: `Bearer ${authorization.authorizationToken}`,
    },
    withCredentials: true,
  });

  async function createAnillo(
    data: FormData,
    tipo: string,
  ): Promise<Anillo | AxiosError> {
    try {
      const response = await axiosInstance.post(`${tipo}/create`, data);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      return err;
    }
  }

  async function editarAnillo(
    data: FormData,
    id: number,
    tipoJoya: string,
  ): Promise<Anillo | AxiosError> {
    try {
      const response = await axiosInstance.put(`${tipoJoya}/editar`, data, {
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

  async function getAnillos(
    tipoJoya: string,
  ): Promise<Anillo[] | Solitario[] | undefined> {
    try {
      const response = await axiosInstance.get(`${tipoJoya}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAnillo(
    id: number,
    tipoJoya: string,
  ): Promise<Anillo | AxiosError> {
    try {
      const response = await axiosInstance.delete(`${tipoJoya}/eliminar`, {
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

  async function replaceImage(
    data: FormData,
    id: number,
    tipoJoya: string,
  ): Promise<Anillo | AxiosError> {
    try {
      const response = await axiosInstance.patch(
        `${tipoJoya}/replaceImage`,
        data,
        {
          params: {
            id: id,
          },
        },
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  }

  async function searchReferencia(
    tipoJoya: string,
    referencia: string,
  ): Promise<boolean | undefined | AxiosError> {
    try {
      const response = await axiosInstanceJson.post(
        `${tipoJoya}/searchReferencia`,
        {
          referencia: referencia,
        },
        {
          headers: {
            Authorization: `Bearer ${authorization.authorizationToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error as AxiosError;
    }
  }

  return {
    getAnillos,
    deleteAnillo,
    createAnillo,
    editarAnillo,
    replaceImage,
    searchReferencia,
  };
}
