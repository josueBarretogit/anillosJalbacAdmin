import type { Anillo, Login } from "@/interfaces/interfaces";
import axios, { AxiosError } from "axios";

let anillos: Anillo[];

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
    console.log(anillos);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
async function deleteAnillo(id: number): Promise<Anillo | undefined> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/anillos/delete",
    );
    anillos = response.data;
    console.log(anillos);

    return response.data;
  } catch (error) {
    console.log(error);
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
async function logOut(): Promise<{ response: string } | undefined> {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/usuarios/logout",

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
    const err = error as AxiosError;
    return err.response?.data as { response: string };
  }
}

export { getAnillos, anillos, logIn, logOut };
