import { Anillo, CreateError } from "@/interfaces/interfaces";
import { createAnillo, getExistingImage } from "@/services/anilloApi";
import { dialogRequestExitoso, creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { validationSchema } from "./validationSchema/validationSchemaCrearEditar";

export function useCambiarImagen(imageName: string) {
  const dialog = ref(false);

  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const isLoading = ref(false);

  function cerrarFormularioCancelar() {
    dialogRequestExitoso.setIsShow(false);
    dialog.value = false;
    handleReset();
  }

  const token = localStorage.getItem("accessToken");
  const { handleSubmit, handleReset } = useForm({
    validationSchema: validationSchema,
  });

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();
    valuesForm.append("image", values.imagen[0]);

    isLoading.value = true;
    const response: Anillo | AxiosError = await createAnillo(
      valuesForm,
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
  return { submit };
}
