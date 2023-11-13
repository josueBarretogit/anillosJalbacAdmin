import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { CreateError, Usuario } from "@/interfaces/interfaces";
import { dialogRequestExitoso, usuario } from "@/variables/store";
import { registrarUsuario } from "@/services/usuariosapi";

export function useFormCrearUsuario() {
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
  const estado = useField("estado");

  const roles = ref(["Administrador", "Empleado"]);

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();

    valuesForm.append("correo", values.correo);
    valuesForm.append("contrasena", values.contrasena);
    valuesForm.append("rol", values.rol);

    console.log(values);

    isLoading.value = true;
    const response: Usuario | AxiosError = await registrarUsuario(valuesForm);
    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);
      usuario.setIsRegistered(usuario.isRegistered + 1);

      dialogMensaje.value = true;
      handleReset();
    } else {
      dialogRequestExitoso.setIsShow(false);
      razonError.value = (response as CreateError).response.data;
      showRazonError.value = true;
    }
  });

  return {
    roles,
    correo,
    contrasena,
    rol,
    dialog,
    estado,
    submit,
    cerrarFormularioCancelar,
    razonError,
    showRazonError,
    isLoading,
    smAndUp,
    dialogMensaje,
  };
}
