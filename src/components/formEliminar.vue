<script lang="ts" setup>
import { ref } from "vue";
import type { Anillo } from "@/interfaces/interfaces";
import { deleteAnillo, getAnillos } from "./../services/anilloApi";
import { AxiosError } from "axios";
import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";

const dialogEliminar = ref(false);
const dialogEliminar2 = ref(false);

defineProps<{
  id: number;
  token: string;
  tipo: string;
}>();

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
</script>

<template>
  <v-dialog v-model="dialogEliminar" width="auto" scrim="true">
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-delete"
        color="red"
        v-bind="props"
        rounded="xl"
        size="large"
      >
        Eliminar
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-alert
              color="red"
              type="error"
              title="Eliminar"
              text="¿Estas seguro que deseas eliminar este anillo?"
            ></v-alert>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="dialogEliminar = false"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="eliminarAnillo(id, token)"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <DialogMensajeRequest
    v-if="dialogEliminar2"
    :dialog-request2="dialogEliminar2"
    :mensaje="`${tipo} eliminado exitosamente`"
  />
</template>
