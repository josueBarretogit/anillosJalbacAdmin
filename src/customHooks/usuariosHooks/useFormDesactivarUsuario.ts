import { ref } from "vue";
import type { Anillo, Usuario } from "@/interfaces/interfaces";
import { AxiosError } from "axios";
import { desactivarUsuario } from "@/services/usuariosapi";
import { dialogRequestExitoso } from "@/variables/store";

export function useFormDesactivar() {
  const dialogEliminar = ref(false);
  const dialogMensaje = ref(false);

  function cerrarFormularioEliminar() {
    dialogRequestExitoso.setIsShow(false);

    dialogEliminar.value = false;
  }

  async function deactivateUsuario(id: number) {
    console.log(id);
    dialogMensaje.value = true;
    const response = await desactivarUsuario(id);
    if (!(response instanceof AxiosError)) {
      dialogRequestExitoso.setFallo(false);
      dialogRequestExitoso.setIsShow(true);
    } else {
      dialogRequestExitoso.setMensajeError(response.response?.data as string);
      dialogRequestExitoso.setFallo(true);
    }
  }

  return {
    dialogMensaje,
    dialogEliminar,
    cerrarFormularioEliminar,
    deactivateUsuario,
  };
}
