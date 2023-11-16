<script setup lang="ts">
import type { Usuario } from "@/interfaces/interfaces";
import FormDesactivarUsuario from "./usuariosComponents/formDesactivarUsuario.vue";
import FormEditarUsuario from "./usuariosComponents/formEditarUsuario.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ref } from "vue";
const props = defineProps<{
  usuario: Usuario;
}>();

const showToolTip = ref(false);
const usuarioIcon =
  props.usuario.rol == "Administrador" ? "account-supervisor" : "account";

const iconAndColor = {
  icon: !props.usuario.estado ? "account-reactivate" : "delete",
  color: !props.usuario.estado ? "green" : "red",
};

const mensajeActivarOdesactivar = !props.usuario.estado
  ? "Activar"
  : "Desactivar";
</script>

<template>
  <v-card width="450" color="grey-darken-4">
    <v-avatar color="info">
      <v-icon :icon="`mdi-${usuarioIcon}`"></v-icon>
    </v-avatar>

    <v-row no-gutters>
      <v-col md="4" class="bg-dark" cols="4">
        <v-card-title class="titulo">Correo</v-card-title>
        <v-card-title class="titulo">Rol</v-card-title>
        <v-card-title class="titulo">Estado</v-card-title>
      </v-col>

      <v-col md="8" cols="8">
        <v-card-title class="subtitlo" @click="showToolTip = !showToolTip"
          >{{ usuario?.correo }}
          <v-tooltip activator="parent" v-model="showToolTip" location="top">
            <h3>{{ usuario?.correo }}</h3>
          </v-tooltip>
        </v-card-title>
        <v-card-title class="subtitlo">{{ usuario?.rol }}</v-card-title>
        <v-card-title class="subtitlo">
          <v-chip
            :color="usuario.estado ? 'green' : 'red'"
            label
            size="large"
            variant="elevated"
          >
            {{ usuario.estado ? "Activo" : "Inactivo" }}
          </v-chip>
        </v-card-title>
      </v-col>
    </v-row>

    <v-card-actions class="d-flex flex-wrap">
      <FormEditarUsuario :usuario-to-update="usuario" />
      <FormDesactivarUsuario
        :id="usuario.id"
        :icon-and-button="iconAndColor"
        :mensaje-activar-odesactivar="mensajeActivarOdesactivar"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.subtitlo {
  color: grey;
}
</style>
