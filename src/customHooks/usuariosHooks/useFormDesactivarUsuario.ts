import { ref } from "vue";
import { AxiosError } from "axios";
import { toggleEstadoUsuario } from "@/services/usuariosapi";
import { dialogRequestExitoso, usuarioStore } from "@/variables/store";

export function useFormDesactivar() {
  const dialogEliminar = ref(false);
  const dialogMensaje = ref(false);

  function cerrarFormularioEliminar() {
    dialogRequestExitoso.setIsShow(false);

    usuarioStore.setIsRegistered(usuarioStore.isRegistered + 1);
    dialogEliminar.value = false;
  }

  async function activarODesactivar(id: number) {
    console.log(id);
    dialogMensaje.value = true;
    const response = await toggleEstadoUsuario(id);
    if (!(response instanceof AxiosError)) {
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);
      dialogMensaje.value = true;
    } else {
      dialogRequestExitoso.setMensajeError(response.response?.data as string);
      dialogRequestExitoso.setFallo(true);
    }
  }

  return {
    dialogMensaje,
    dialogEliminar,
    cerrarFormularioEliminar,
    activarODesactivar,
  };
}
