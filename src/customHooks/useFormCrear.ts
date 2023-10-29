import { createAnillo } from "@/services/anilloApi";
import { creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { Anillo, CreateError } from "@/interfaces/interfaces";
import { dialogRequestExitoso } from "./../variables/store";

export function useFormCrear() {
  const { smAndUp } = useDisplay();

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
    validationSchema: {
      nombre(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      pesoOro(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      pesoPlata(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      categoria(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      talla(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      referencia(value: string) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
      imagen(value: File[]) {
        if (!value) {
          return "Este campo es obligatorio";
        }
        return true;
      },
    },
  });

  const nombre = useField("nombre");
  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const categoria = useField("categoria");
  const talla = useField("talla");
  const referencia = useField("referencia");
  const imagen = useField<File[]>("imagen");

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();
    valuesForm.append("nombre", values.nombre);
    valuesForm.append("pesoOro", values.pesoOro);
    valuesForm.append("pesoPlata", values.pesoPlata);
    valuesForm.append("categoria", values.categoria);
    valuesForm.append("talla", values.talla);
    valuesForm.append("referencia", values.referencia);
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
  return {
    nombre,
    pesoOro,
    pesoPlata,
    categoria,
    talla,
    referencia,
    imagen,
    submit,
    dialog,
    smAndUp,
    isLoading,
    razonError,
    showRazonError,
    cerrarFormularioCancelar,
  };
}
