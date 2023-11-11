import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { Anillo, CreateError } from "@/interfaces/interfaces";

export function useFormCrear() {
  const { smAndUp } = useDisplay();

  const dialog = ref(false);
  const dialogMensaje = ref(false);

  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const isLoading = ref(false);

  function cerrarFormularioCancelar() {
    dialogRequestExitoso.setIsShow(false);
    dialog.value = false;
    handleReset();
  }

  const { handleSubmit, handleReset } = useForm({
    validationSchema: {
      correo(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      contrasena(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      rol(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
    },
  });

  const correo = useField("correo");
  const contrasena = useField("contrasena");
  const rol = useField("rol");

  conscategoriat submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();

    valuesForm.append("correo", values.correo);
    valuesForm.append("contrasena", values.contrasena);
    valuesForm.append("rol", values.rol);

    console.log(values);

    isLoading.value = true;
    const response: Anillo | AxiosError = await createAnillo(
      valuesForm,
      tipoJoya,
    );
    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);

      if (tipoJoya == "nombres") {
        creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
        console.log("created nombre");
      } else if (tipoJoya == "solitarios") {
        creacionAnillos.setIsCreatedSolitario(
          creacionAnillos.isCreatedSolitario + 1,
        );
        console.log("created solitario");
      } else if (tipoJoya == "dijes") {
        creacionAnillos.setIsCreatedDije(creacionAnillos.isCreatedDije + 1);
      }

      dialogMensaje.value = true;
      handleReset();
    } else {
      dialogRequestExitoso.setIsShow(false);
      razonError.value = (response as CreateError).response.data;
      showRazonError.value = true;
    }
  });
  return {

  };
}
