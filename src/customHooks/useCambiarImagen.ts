import { Anillo, CreateError } from "@/interfaces/interfaces";
import { createAnillo, replaceImage } from "@/services/anilloApi";
import { dialogRequestExitoso, creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { validationSchema } from "./validationSchema/validationSchemaReplaceImage";

export function useCambiarImagen(imageName: string, id: number) {
  const imagen = useField<File[]>("imagen");
  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const isLoading = ref(false);

  const token = localStorage.getItem("accessToken");

  const { handleSubmit, handleReset } = useForm();

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();
    alert("hola");
    valuesForm.append("image", values.imagen[0]);

    isLoading.value = true;
    const response: Anillo | AxiosError = await replaceImage(
      valuesForm,
      id,
      token as string,
    );

    isLoading.value = false;
    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      dialogRequestExitoso.setIsShow(true);
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      handleReset();
    } else {
      razonError.value = (response as CreateError).response.data;
      showRazonError.value = true;
    }
  });
  return { submit, imagen };
}
