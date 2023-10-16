import type { Solitario } from "@/interfaces/interfaces";
import axios, { Axios, AxiosError } from "axios";

async function createSolitario(
  data: FormData,
  token: string,
): Promise<Solitario | AxiosError> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/solitarios/create",
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
    const err = error as AxiosError;
    return err;
  }
}

async function getSolitario(
  id: number,
  isLoading: boolean,
): Promise<Solitario | undefined> {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/solitarios/getone",
      {
        id: id,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getSolitarios(): Promise<Solitario[] | undefined> {
  try {
    const response = await axios.get("http://localhost:4000/api/solitarios");
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
}

async function deleteSolitario(
  id: number,
  token: string,
): Promise<Solitario | AxiosError> {
  try {
    const response = await axios.delete(
      "http://localhost:4000/api/solitarios/eliminarSolitario",
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

    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err;
  }
}

export { getSolitarios, deleteSolitario, createSolitario };
