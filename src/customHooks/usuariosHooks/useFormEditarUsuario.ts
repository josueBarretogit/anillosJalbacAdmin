import { AxiosError } from "axios";
import { useField, useForm } from "vee-validate";
import { ref, Ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { CreateError, Usuario } from "@/interfaces/interfaces";
import { dialogRequestExitoso, usuarioStore } from "@/variables/store";
import useUsuarioApi from "@/services/usuariosapi";
import { validationSchemaEditarUsuario } from "../validationSchema/validationSchemaUsuario";

export function useFormEditarUsuario(usuarioToUpdate: Usuario) {
  const { smAndUp } = useDisplay();
  const { actualizarUsuario } = useUsuarioApi();

  const dialog = ref(false);
  const dialogMensaje = ref(false);

  const razonError = ref<unknown>("");
  const showRazonError = ref(false);

  const isLoading = ref(false);

  function cerrarFormularioCancelar() {
    dialogRequestExitoso.setIsShow(false);
    dialog.value = false;
    usuarioStore.setIsRegistered(usuarioStore.isRegistered + 1);
  }

  const { handleSubmit } = useForm({
    validationSchema: validationSchemaEditarUsuario,
  });

  const correo = useField("correo");
  const contrasena = useField("contrasena");
  const rol = useField("rol");

  correo.value.value = usuarioToUpdate.correo;
  rol.value.value = usuarioToUpdate.rol;

  const roles = ref(["Administrador", "Empleado"]);

  const submit = handleSubmit(async (values) => {
    const valuesForm = new FormData();

    if (values.contrasena) {
      valuesForm.append("contrasena", values.contrasena);
    }
    valuesForm.append("correo", values.correo);
    valuesForm.append("rol", values.rol);

    console.log(values);

    isLoading.value = true;
    const response: Usuario | AxiosError = await actualizarUsuario(
      valuesForm,
      usuarioToUpdate.id,
    );
    isLoading.value = false;

    if (!(response instanceof AxiosError)) {
      showRazonError.value = false;
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);
      usuarioStore.setIsRegistered(usuarioStore.isRegistered + 1);
      dialogMensaje.value = true;
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
    submit,
    cerrarFormularioCancelar,
    razonError,
    showRazonError,
    isLoading,
    smAndUp,
    dialogMensaje,
  };
}
