import { editarAnillo } from "@/services/anilloApi";
import { creacionAnillos } from "@/variables/store";
import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

export function useFormEditar(joya: any) {
  const { smAndUp } = useDisplay();

  const dialog = ref(false);

  const dialog2 = ref(false);

  const isLoading = ref(false);
  function cerrarFormularioCancelar() {
    dialog2.value = false;
    dialog.value = false;
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
    },
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
      dialog2.value = true;
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
    } else {
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
    dialog2,
    smAndUp,
    cerrarFormularioCancelar,
    isLoading,
  };
}