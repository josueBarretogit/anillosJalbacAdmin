import { ref } from "vue";
import useAnillosApi from "./../services/anilloApi";
import { AxiosError } from "axios";
import { dialogRequestExitoso, tabs } from "./../variables/store";

export function useFormEliminar() {
  const dialogEliminar = ref(false);
  const dialogMensaje = ref(false);

  const { deleteAnillo } = useAnillosApi();

  function cerrarFormularioEliminar() {
    dialogRequestExitoso.setIsShow(false);

    dialogEliminar.value = false;
  }

  async function eliminarAnillo(id: number, token: string) {
    dialogMensaje.value = true;
    const response = await deleteAnillo(id, tabs.tabs);
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
