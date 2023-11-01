import { editarAnillo } from "@/services/anilloApi";
import { creacionAnillos, dialogRequestExitoso } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { validationSchema } from "./validationSchema/validationSchemaCrearEditar";

export function useFormEditar(joya: any) {
  const { smAndUp } = useDisplay();

  const dialog = ref(false);

  const dialogMensaje = ref(false);

  const isLoading = ref(false);
  function cerrarFormularioCancelar() {
    dialogMensaje.value = false;
    dialog.value = false;
  }

  const token = localStorage.getItem("accessToken");

  const { handleSubmit, handleReset } = useForm({
    validationSchema: validationSchema,
  });

  const id = useField("id");
  const nombre = useField("nombre");
  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const categoria = useField("categoria");
  const talla = useField("talla");
  const referencia = useField("referencia");

  id.value.value = joya.id;
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

    isLoading.value = true;
    const response = await editarAnillo(
      valuesForm,
      id.value.value as string,
      token as string,
    );

    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      dialogRequestExitoso.setIsShow(true);
      dialogMensaje.value = true;
    } else {
      dialogRequestExitoso.setIsShow(false);
      console.log(response);
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
  };
}
