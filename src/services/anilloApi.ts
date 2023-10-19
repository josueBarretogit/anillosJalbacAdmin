import type { Anillo, Login } from "@/interfaces/interfaces";
import axios, { AxiosError } from "axios";

let anillos: Anillo[];
async function createAnillo(
  data: FormData,
  token: string,
): Promise<Anillo | AxiosError> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/anillos/create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}

async function editarAnillo(
  data: FormData,
  id: string,
  token: string,
): Promise<Anillo | AxiosError> {
  try {
    data.forEach((values) => console.log(values));
    const response = await axios.put(
      `http://localhost:4000/api/anillos/editar/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}
async function getAnillo(
  id: number,
  isLoading: boolean,
): Promise<Anillo | undefined> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/anillos/getone",
      {
        id: id,
      },
    );
    anillos = response.data;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAnillos(): Promise<Anillo[] | undefined> {
  try {
    const response = await axios.get("http://localhost:4000/api/anillos/");
    anillos = response.data;

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function deleteAnillo(
  id: number,
  token: string,
): Promise<Anillo | AxiosError> {
  try {
    const response = await axios.delete(
      "http://localhost:4000/api/anillos/eliminarAnillo",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        data: {
          id: id,
        },
      },
    );

    anillos = response.data;

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
    const response = await axios.post(
      "http://localhost:4000/api/usuarios/login",
      {
        correo,
        contrasena,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    const err = error as AxiosError;
    return err.response?.data as Login;
  }
}
async function logOut(
  token: string | null,
): Promise<{ response: string } | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/usuarios/logout",

      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;
    return err.response?.data as { response: string };
  }
}

export {
  getAnillos,
  anillos,
  logIn,
  logOut,
  deleteAnillo,
  createAnillo,
  editarAnillo,
};
