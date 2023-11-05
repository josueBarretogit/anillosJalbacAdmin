import { editarAnillo } from "@/services/anilloApi";
import { creacionAnillos, dialogRequestExitoso, tabs } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { validationSchemaEditar } from "./validationSchema/validationSchemaCrearEditar";
import { Anillo, CreateError } from "@/interfaces/interfaces";

export function useFormEditar(joya: Anillo) {
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
    validationSchema: validationSchemaEditar,
  });

  const nombre = useField("nombre");
  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const categoria = useField("categoria");
  const talla = useField("talla");
  const referencia = useField("referencia");

  nombre.value.value = joya.nombre;
  pesoOro.value.value = joya.pesoOro;
  pesoPlata.value.value = joya.pesoPlata;
  categoria.value.value = joya.categoria;
  talla.value.value = joya.talla;
  referencia.value.value = joya.referencia;

  const submit = handleSubmit(async (values) => {
    console.log(values);
    const valuesForm = new FormData();
    valuesForm.append("nombre", values.nombre);
    valuesForm.append("pesoOro", values.pesoOro);
    valuesForm.append("pesoPlata", values.pesoPlata);
    valuesForm.append("categoria", values.categoria);
    valuesForm.append("talla", values.talla);
    valuesForm.append("referencia", values.referencia);

    console.log("editado");
    isLoading.value = true;
    const response = await editarAnillo(valuesForm, joya.id, tabs.tabs);

    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      dialogRequestExitoso.setIsShow(true);
      dialogMensaje.value = true;
    } else {
      dialogRequestExitoso.setIsShow(false);
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
