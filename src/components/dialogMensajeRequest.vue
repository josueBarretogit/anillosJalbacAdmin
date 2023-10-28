<script lang="ts" setup>
import { ref } from "vue";
import { creacionAnillos } from "@/variables/store";
import { dialogRequestExitoso } from "@/variables/store";

const props = defineProps<{
  mensaje: string;
}>();

function cerrarDialog() {
  creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
  dialogRequestExitoso.setIsShow(false);
}
</script>

<template>
  <v-dialog v-model="dialogRequestExitoso.isShow" width="auto" scrim="#000000">
    <v-card>
      <v-card-text
        ><v-alert
          type="success"
          title="Operacion exitosa"
          :text="mensaje"
        ></v-alert
      ></v-card-text>
      <v-card-actions>
        <v-btn color="blue" variant="text" @click="cerrarDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
