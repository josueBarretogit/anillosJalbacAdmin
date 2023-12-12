import { ref } from "vue";
import { AxiosError } from "axios";
import useUsuarioApi from "@/services/usuariosapi";
import { dialogRequestExitoso, usuarioStore } from "@/variables/store";

export function useFormDesactivar() {
  const dialogEliminar = ref(false);
  const dialogMensaje = ref(false);

  const { toggleEstadoUsuario } = useUsuarioApi();

  function cerrarFormulario() {
    dialogRequestExitoso.setIsShow(false);

    dialogEliminar.value = false;

    dialogMensaje.value = false;
    usuarioStore.setIsRegistered(usuarioStore.isRegistered + 1);
  }

  async function activarODesactivar(id: number) {
    const response = await toggleEstadoUsuario(id);
    if (!(response instanceof AxiosError)) {
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);
      dialogMensaje.value = true;
      dialogEliminar.value = false;
    } else {
      dialogRequestExitoso.setMensajeError(response.response?.data as string);
      dialogRequestExitoso.setFallo(true);
    }
  }

  return {
    dialogMensaje,
    dialogEliminar,
    cerrarFormulario,
    activarODesactivar,
  };
}
