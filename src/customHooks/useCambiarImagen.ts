import { Anillo, CreateError } from "@/interfaces/interfaces";
import { creacionAnillos, imageReplacing, tabs } from "@/variables/store";
import { AxiosError } from "axios";
import { ref } from "vue";
import { dialogRequestExitoso } from "@/variables/store";
import useAnillosApi from "@/services/anilloApi";

export function useCambiarImagen() {
  const razonError = ref<unknown>("");

  const isLoading = ref(false);
  const dialogMensaje = ref(false);

  const { replaceImage } = useAnillosApi();

  const imagen = ref<File[]>([]);

  function clickInput() {
    const input: HTMLElement | null = document.getElementById("hiddenInput");
    input?.click();
  }

  async function submitImage(data: File[], id: number) {
    imagen.value = data;
    const valuesForm = new FormData();
    valuesForm.append("image", imagen?.value?.[0] as File);

    imageReplacing.setIsLoading(true);

    imageReplacing.setIdAnilloLoading(id);
    isLoading.value = true;
    const response = await replaceImage(valuesForm, id, tabs.tabs);

    isLoading.value = false;
    imageReplacing.setIsLoading(false);

    if (!(response instanceof AxiosError)) {
      if (tabs.tabs == "nombres") {
        creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      } else if (tabs.tabs == "solitarios") {
        creacionAnillos.setIsCreatedSolitario(
          creacionAnillos.isCreatedSolitario + 1,
        );
      } else if (tabs.tabs == "dijes") {
        creacionAnillos.setIsCreatedDije(creacionAnillos.isCreatedDije + 1);
      }
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
