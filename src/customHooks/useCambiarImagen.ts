import { Anillo, CreateError } from "@/interfaces/interfaces";
import { createAnillo, replaceImage } from "@/services/anilloApi";
import { dialogRequestExitoso, creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { validationSchema } from "./validationSchema/validationSchemaReplaceImage";

export function useCambiarImagen(imageName: string, id: number) {
  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const isLoading = ref(false);

  const token = localStorage.getItem("accessToken");

  return {};
}
