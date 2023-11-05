import { Anillo, CreateError } from "@/interfaces/interfaces";
import { createAnillo, replaceImage } from "@/services/anilloApi";
import { creacionAnillos, imageReplacing, tabs } from "@/variables/store";
import { AxiosError } from "axios";
import { ref } from "vue";
import { dialogRequestExitoso } from "@/variables/store";

export function useCambiarImagen() {
  const razonError = ref<unknown>("");

  const isLoading = ref(false);
  const dialogMensaje = ref(false);

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

    imageReplacing.setIdAnilloLoading(id);
    isLoading.value = true;
    const response = await replaceImage(valuesForm, id, tabs.tabs);

    isLoading.value = false;
    imageReplacing.setIsLoading(false);

    if (!(response instanceof AxiosError)) {
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
    } else {
      console.log("hubo un error");

      dialogRequestExitoso.setFallo(true);
      dialogRequestExitoso.setIsShow(true);
      imageReplacing.setFalloReplace(true);
      dialogRequestExitoso.setMensajeError(response.response?.data as string);
      dialogMensaje.value = true;
    }
  }
  return {
    clickInput,
    submitImage,
    imagen,
    isLoading,
    dialogMensaje,
    razonError,
  };
}
