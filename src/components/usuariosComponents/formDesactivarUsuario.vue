<script lang="ts" setup>
import { useFormDesactivar } from "@/customHooks/usuariosHooks/useFormDesactivarUsuario";
import { dialogRequestExitoso } from "@/variables/store";
import DialogMensajeRequest from "../dialogMensajeRequest.vue";
import { usuarioStore } from "@/variables/store";
const props = defineProps<{
  id: number;
  iconAndButton: { icon: string; color: string };
  mensajeActivarOdesactivar: string;
  estado: boolean;
}>();

const { dialogEliminar, activarODesactivar, dialogMensaje, cerrarFormulario } =
  useFormDesactivar();
const lowerCasedMensaje = props.mensajeActivarOdesactivar.replace(
  props.mensajeActivarOdesactivar[0],
  props.mensajeActivarOdesactivar[0].toLowerCase(),
);
const iconActivar = "account-reactivate";
const iconDesactivar = "delete";

const colorActivar = "green";
const colorDesactivar = "red";
</script>

<template>
  <v-dialog v-model="dialogEliminar" width="auto" scrim="true">
    <template v-slot:activator="{ props }">
      <v-btn
        :prepend-icon="`mdi-${!estado ? iconActivar : iconDesactivar}`"
        :color="`${!estado ? colorActivar : colorDesactivar}`"
        v-bind="props"
        rounded="xl"
        size="large"
        :key="usuarioStore.isRegistered"
      >
        {{ estado ? "Desactivar" : "Activar" }}
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-alert
              type="warning"
              :title="mensajeActivarOdesactivar"
              :text="`¿Estas seguro que deseas ${lowerCasedMensaje} este usuario?`"
            ></v-alert>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="cerrarFormulario">
          Cancelar
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="activarODesactivar(id)"
        >
          {{ estado ? "Desactivar" : "Activar" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
