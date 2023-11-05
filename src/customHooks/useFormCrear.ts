import { createAnillo } from "@/services/anilloApi";
import { creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { Anillo, CreateError } from "@/interfaces/interfaces";
import { dialogRequestExitoso } from "./../variables/store";
import {
  validationSchemaCrearNombre,
  validationSchemaCrearSolitario,
} from "./validationSchema/validationSchemaCrearEditar";

export function useFormCrear(tipoJoya: string) {
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
    validationSchema:
      tipoJoya == "nombres"
        ? validationSchemaCrearNombre
        : validationSchemaCrearSolitario,
  });
  console.log("hola" + tipoJoya);

  const nombre = useField("nombre");
  const categoria = useField("categoria");
  const formaPiedra = useField("formaPiedra");
  const tamanoPiedra = useField("tamanoPiedra");
  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const talla = useField("talla");
  const referencia = useField("referencia");
  const imagen = useField<File[]>("imagen");

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();

    if (tipoJoya == "nombres") {
      valuesForm.append("nombre", values.nombre);
      valuesForm.append("categoria", values.categoria);
    } else if (tipoJoya == "solitarios") {
      valuesForm.append("formaPiedra", values.formaPiedra);
      valuesForm.append("tamanoPiedra", values.tamanoPiedra);
    }

    valuesForm.append("pesoOro", values.pesoOro);
    valuesForm.append("pesoPlata", values.pesoPlata);
    valuesForm.append("talla", values.talla);
    valuesForm.append("referencia", values.referencia);
    valuesForm.append("image", values.imagen[0]);

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
    nombre,
    categoria,
    formaPiedra,
    tamanoPiedra,
    pesoOro,
    pesoPlata,
    talla,
    referencia,
    imagen,
    submit,
    dialog,
    dialogMensaje,
    smAndUp,
    isLoading,
    razonError,
    showRazonError,
    cerrarFormularioCancelar,
  };
}
