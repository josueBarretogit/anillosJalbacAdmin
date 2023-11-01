import { ref } from "vue";
import type { Anillo } from "@/interfaces/interfaces";
import { deleteAnillo } from "./../services/anilloApi";
import { AxiosError } from "axios";
import { dialogRequestExitoso } from "./../variables/store";

export function useFormEliminar() {
  const dialogEliminar = ref(false);
  const dialogMensaje = ref(false);

  function cerrarFormularioEliminar() {
    dialogRequestExitoso.setIsShow(false);

    dialogEliminar.value = false;
  }

  async function eliminarAnillo(id: number, token: string) {
    dialogMensaje.value = true;
    const response = await deleteAnillo(id, token);
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
    eliminarAnillo,
  };
}
