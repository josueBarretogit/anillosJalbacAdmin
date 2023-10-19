<script lang="ts" setup>
import { ref } from "vue";
import { creacionAnillos } from "@/variables/store";

const props = defineProps<{
  dialogRequest2: boolean;
  mensaje: string;
}>();

const dialog = ref(props.dialogRequest2);
function cerrarDialog() {
  creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
  dialog.value = false;
}
</script>

<template>
  <v-dialog v-model="dialog" width="auto" scrim="#000000">
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
