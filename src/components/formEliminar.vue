<script lang="ts" setup>
import DialogMensajeRequest from "./../components/dialogMensajeRequest.vue";
import { dialogRequestExitoso } from "@/variables/store";
import { useFormEliminar } from "./../customHooks/useFormEliminar";
defineProps<{
  id: number;
  token: string;
  tipo: string;
}>();
const { dialogEliminar, eliminarAnillo, dialogMensaje } = useFormEliminar();
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
              type="warning"
              title="Eliminar"
              :text="`¿Estas seguro que deseas eliminar este ${id}?`"
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
    v-if="dialogMensaje"
    :mensaje="`${tipo} eliminado exitosamente`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
