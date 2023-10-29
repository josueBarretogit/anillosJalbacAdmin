import { ref } from "vue";
import type { Anillo } from "@/interfaces/interfaces";
import { deleteAnillo } from "./../services/anilloApi";
import { AxiosError } from "axios";
import { dialogRequestExitoso } from "./../variables/store";

export function useFormEliminar() {
  const dialogEliminar = ref(false);
  const dialogEliminar2 = ref(false);

  function cerrarFormularioEliminar() {
    dialogRequestExitoso.setIsShow(false);

    dialogEliminar.value = false;
  }

  async function eliminarAnillo(id: number, token: string) {
    console.log(id);
    const response = await deleteAnillo(id, token);
    if (!(response instanceof AxiosError)) {
      dialogRequestExitoso.setIsShow(true);
    }
  }

  return {
    dialogEliminar2,
    dialogEliminar,
    cerrarFormularioEliminar,
    eliminarAnillo,
  };
}
