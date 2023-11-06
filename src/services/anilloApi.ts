import type { Anillo, Login } from "@/interfaces/interfaces";
import axios, { AxiosError } from "axios";

const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
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

async function getAnillos(tipoJoya: string): Promise<Anillo[] | undefined> {
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
async function logIn(
  correo: string,
  contrasena: string,
): Promise<Login | undefined> {
  try {
    const response = await axiosInstance.post(`usuarios/login`, {
      correo,
      contrasena,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    const err = error as AxiosError;
    return err.response?.data as Login;
  }
}

async function logOut(): Promise<{ response: string } | undefined> {
  try {
    const response = await axiosInstance.get("usuarios/logout");
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as { response: string };
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

export {
  getAnillos,
  logIn,
  logOut,
  deleteAnillo,
  createAnillo,
  editarAnillo,
  replaceImage,
};
