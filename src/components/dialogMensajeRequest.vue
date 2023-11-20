<script lang="ts" setup>
import { ref } from "vue";
import { creacionAnillos, imageReplacing, tabs } from "@/variables/store";
import { dialogRequestExitoso } from "@/variables/store";

const props = defineProps<{
  mensaje: string;
  mensajeError: string | undefined;
  fallo: boolean;
}>();

function cerrarDialog() {
  if (tabs.tabs == "nombres") {
    creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
  } else if (tabs.tabs == "solitarios") {
    creacionAnillos.setIsCreatedSolitario(
      creacionAnillos.isCreatedSolitario + 1,
    );
  } else if (tabs.tabs == "dijes") {
    creacionAnillos.setIsCreatedDije(creacionAnillos.isCreatedDije + 1);
  }

  dialogRequestExitoso.setFallo(false);
  imageReplacing.setFalloReplace(false);
  dialogRequestExitoso.setIsShow(false);
}
</script>

<template>
  <v-dialog v-model="dialogRequestExitoso.isShow" width="auto" scrim="#000000">
    <v-card>
      <v-card-text v-if="dialogRequestExitoso.fallo"
        ><v-alert
          type="error"
          title="Operación falló"
          :text="mensajeError"
        ></v-alert>
      </v-card-text>
      <v-card-text v-else
        ><v-alert
          type="success"
          title="Operacion exitosa"
          :text="mensaje"
        ></v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn color="blue" variant="text" @click="cerrarDialog">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
