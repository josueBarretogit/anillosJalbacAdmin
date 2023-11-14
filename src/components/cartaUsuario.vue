<script setup lang="ts">
import type { Usuario } from "@/interfaces/interfaces";
import FormDesactivarUsuario from "./usuariosComponents/formDesactivarUsuario.vue";
import FormEditarUsuario from "./usuariosComponents/formEditarUsuario.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const props = defineProps<{
  usuario: Usuario;
}>();

const { xs } = useDisplay();
const usuarioIcon =
  props.usuario.rol == "Administrador" ? "account-supervisor" : "account";
</script>

<template>
  <v-card :width="xs ? '500' : 450" color="grey-darken-4">
    <v-avatar color="info">
      <v-icon :icon="`mdi-${usuarioIcon}`"></v-icon>
    </v-avatar>

    <v-row no-gutters>
      <v-col sm="6" md="4" class="bg-dark">
        <v-card-title class="titulo">Correo</v-card-title>
        <v-card-title class="titulo">Rol</v-card-title>
        <v-card-title class="titulo">Estado</v-card-title>
      </v-col>

      <v-col sm="6" md="8" class="bg-white">
        <v-card-title class="subtitlo">{{ usuario?.correo }}</v-card-title>
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
      <FormDesactivarUsuario :id="usuario.id" />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.subtitlo {
  color: grey;
  display: block;
  widows: 100%;
}
</style>
