<script lang="ts" setup>
import { ref } from "vue";
import type { Anillo } from "@/interfaces/interfaces";
import { deleteAnillo, getAnillos } from "./../services/anilloApi";
import { AxiosError } from "axios";

import { creacionAnillos } from "@/variables/store";
const dialogEliminar = ref(false);
const dialogEliminar2 = ref(false);
defineProps<{
  idAnillo: number;
  token: string;
}>();

function cerrarFormularioEliminar() {
  dialogEliminar2.value = false;
  dialogEliminar.value = false;
}

async function eliminarAnillo(id: number, token: string) {
  const response: Anillo | AxiosError = await deleteAnillo(id, token);
  console.log(id);
  console.log(response);
  if (response) {
    dialogEliminar2.value = true;

    creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
  }
}
</script>

<template>
  <v-dialog v-model="dialogEliminar" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn color="red" v-bind="props" rounded="xl"> Eliminar </v-btn>
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
          @click="eliminarAnillo(idAnillo, token)"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogEliminar2" width="auto">
    <v-card>
      <v-card-title>Operacion exitosa </v-card-title>
      <v-card-text> Anillo eliminado correctamente</v-card-text>
      <v-card-actions>
        <v-btn color="blue" variant="text" @click="cerrarFormularioEliminar">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
