import { editarAnillo } from "@/services/anilloApi";
import { creacionAnillos, dialogRequestExitoso, tabs } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import {
  validationSchemaEditarNombre,
  validationSchemaEditarSolitario,
} from "./validationSchema/validationSchemaCrearEditar";
import { Anillo, CreateError, Dije, Solitario } from "@/interfaces/interfaces";

export function useFormEditar(
  joya: Anillo & Solitario & Dije,
  tipoJoya: string,
) {
  const { smAndUp } = useDisplay();

  const dialog = ref(false);

  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const dialogMensaje = ref(false);

  const isLoading = ref(false);

  function cerrarFormularioCancelar() {
    dialogMensaje.value = false;
    dialog.value = false;
  }

  const { handleSubmit, handleReset } = useForm({
    validationSchema:
      tipoJoya == "nombres"
        ? validationSchemaEditarNombre
        : validationSchemaEditarSolitario,
  });

  const nombre = useField("nombre");
  const categoria = useField("categoria");

  const tamanoPiedra = useField("tamanoPiedra");
  const formaPiedra = useField("formaPiedra");

  const alto = useField("alto");
  const ancho = useField("ancho");
  const categoriaDije = useField("categoriaDije");

  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const talla = useField("talla");
  const referencia = useField("referencia");

  nombre.value.value = joya.nombre;
  pesoOro.value.value = joya.pesoOro;

  formaPiedra.value.value = joya.formaPiedra;
  tamanoPiedra.value.value = joya.tamanoPiedra;

  alto.value.value = joya.alto;
  ancho.value.value = joya.ancho;
  categoriaDije.value.value = joya.categoria;

  pesoPlata.value.value = joya.pesoPlata;
  categoria.value.value = joya.categoria;
  talla.value.value = joya.talla;
  referencia.value.value = joya.referencia;

  const submit = handleSubmit(async (values) => {
    console.log(values);
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

    console.log("editado" + tabs.tabs);
    isLoading.value = true;
    const response = await editarAnillo(valuesForm, joya.id, tabs.tabs);

    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      if (tipoJoya == "nombres") {
        dialogMensaje.value = true;
        creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      } else if (tipoJoya == "solitarios") {
        dialogMensaje.value = true;
        creacionAnillos.setIsCreatedSolitario(
          creacionAnillos.isCreatedSolitario + 1,
        );
      }
      dialogRequestExitoso.setIsShow(true);
    } else {
      dialogRequestExitoso.setIsShow(false);
      razonError.value = (response as CreateError).response.data;
      showRazonError.value = true;
    }
  });

  return {
    nombre,
    formaPiedra,
    tamanoPiedra,
    pesoOro,
    pesoPlata,
    categoria,
    talla,
    referencia,
    submit,
    dialog,
    dialogMensaje,
    smAndUp,
    cerrarFormularioCancelar,
    isLoading,
    showRazonError,
    razonError,
  };
}
