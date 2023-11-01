import { Anillo, CreateError } from "@/interfaces/interfaces";
import { createAnillo, replaceImage } from "@/services/anilloApi";
import {
  dialogRequestExitoso,
  creacionAnillos,
  imageReplacing,
} from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { validationSchema } from "./validationSchema/validationSchemaReplaceImage";

export function useCambiarImagen(id: number) {
  const razonError = ref<unknown>("");

  const showRazonError = ref(false);

  const token = localStorage.getItem("accessToken");

  const imagen = ref<File[]>([]);

  function clickInput() {
    const input: HTMLElement | null = document.getElementById("hiddenInput");
    input?.click();
  }

  async function submitImage(data: File[], id: number) {
    console.log(data);
    imagen.value = data;
    const valuesForm = new FormData();
    valuesForm.append("image", imagen?.value?.[0] as File);
    console.log(imagen.value[0]);

    imageReplacing.setIsLoading(true);

    const response = await replaceImage(valuesForm, id, token as string);

    imageReplacing.setIsLoading(false);
    console.log(response);
    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
    } else {
      razonError.value = (response as CreateError).response.data;
      showRazonError.value = true;
    }
  }
  return { clickInput, submitImage, imagen };
}
