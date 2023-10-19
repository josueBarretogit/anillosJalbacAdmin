import { ref } from "vue";
import type { Anillo } from "@/interfaces/interfaces";
import { deleteAnillo } from "./../services/anilloApi";
import { AxiosError } from "axios";

export function useFormEliminar() {
  const dialogEliminar = ref(false);
  const dialogEliminar2 = ref(false);

  function cerrarFormularioEliminar() {
    dialogEliminar2.value = false;

    dialogEliminar.value = false;
  }

  async function eliminarAnillo(id: number, token: string) {
    const response: Anillo | AxiosError = await deleteAnillo(id, token);
    if (response) {
      dialogEliminar2.value = true;
    }
  }

  return {
    dialogEliminar2,
    dialogEliminar,
    cerrarFormularioEliminar,
    eliminarAnillo,
  };
}
