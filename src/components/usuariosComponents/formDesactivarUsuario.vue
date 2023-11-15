<script lang="ts" setup>
import { useFormDesactivar } from "@/customHooks/usuariosHooks/useFormDesactivarUsuario";
import { dialogRequestExitoso } from "@/variables/store";
import DialogMensajeRequest from "../dialogMensajeRequest.vue";

const props = defineProps<{
  id: number;
  iconAndButton: { icon: string; color: string };
  mensajeActivarOdesactivar: string;
}>();

const { dialogEliminar, activarODesactivar, dialogMensaje } =
  useFormDesactivar();
</script>

<template>
  <v-dialog v-model="dialogEliminar" width="auto" scrim="true">
    <template v-slot:activator="{ props }">
      <v-btn
        :prepend-icon="`mdi-${iconAndButton.icon}`"
        :color="`${iconAndButton.color}`"
        v-bind="props"
        rounded="xl"
        size="large"
      >
        {{ mensajeActivarOdesactivar }}
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-alert
              type="warning"
              title="Eliminar"
              :text="`¿Estas seguro que deseas ${mensajeActivarOdesactivar} este usuario?`"
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
          @click="activarODesactivar(id)"
        >
          {{ mensajeActivarOdesactivar }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <DialogMensajeRequest
    v-if="dialogMensaje"
    :mensaje="`Usuario ${mensajeActivarOdesactivar} exitosamente`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
