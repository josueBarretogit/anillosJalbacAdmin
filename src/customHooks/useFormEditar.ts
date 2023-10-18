import { editarAnillo } from "@/services/anilloApi";
import { creacionAnillos } from "@/variables/store";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

export function useFormEditar(joya: any) {
  const { smAndUp } = useDisplay();

  const dialog = ref(false);

  const dialog2 = ref(false);

  function cerrarFormularioCancelar() {
    dialog2.value = false;
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
    },
  });

  const id = useField("id");
  const nombre = useField("nombre");
  const pesoOro = useField("pesoOro");
  const pesoPlata = useField("pesoPlata");
  const categoria = useField("categoria");
  const talla = useField("talla");
  const referencia = useField("referencia");
  //const imagen = useField<File[]>("imagen");

  id.value.value = joya.id;
  nombre.value.value = joya.nombre;
  pesoOro.value.value = joya.pesoOro;
  pesoPlata.value.value = joya.pesoPlata;
  categoria.value.value = joya.categoria;
  talla.value.value = joya.talla;
  referencia.value.value = joya.referencia;

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();
    valuesForm.append("id", id.value.value as string);
    valuesForm.append("nombre", values.nombre);
    valuesForm.append("pesoOro", values.pesoOro);
    valuesForm.append("pesoPlata", values.pesoPlata);
    valuesForm.append("categoria", values.categoria);
    valuesForm.append("talla", values.talla);
    valuesForm.append("referencia", values.referencia);

    const response = await editarAnillo(valuesForm, token as string);
    console.log(response);
    if (response) {
      dialog2.value = true;
      creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
      handleReset();
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
  };
}
