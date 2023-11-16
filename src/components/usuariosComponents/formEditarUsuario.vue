<script lang="ts" setup>
import DialogMensajeRequest from "../dialogMensajeRequest.vue";
import { dialogRequestExitoso } from "@/variables/store";
import InputsCrearEditarUsuario from "./inputsCrearEditarUsuario.vue";
import { useFormEditarUsuario } from "@/customHooks/usuariosHooks/useFormEditarUsuario";
import { Usuario } from "@/interfaces/interfaces";
import { ref } from "vue";

const cambiarContrasena = ref(false);
const props = defineProps<{
  usuarioToUpdate: Usuario;
}>();

const {
  cerrarFormularioCancelar,
  correo,
  contrasena,
  rol,
  roles,
  isLoading,
  razonError,
  showRazonError,
  submit,
  smAndUp,
  dialog,
  dialogMensaje,
} = useFormEditarUsuario(props.usuarioToUpdate, cambiarContrasena);
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto" scrim="#000000">
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-pencil"
        color="blue"
        v-bind="props"
        rounded="xl"
        size="large"
      >
        Editar
      </v-btn>
    </template>

    <v-card :width="smAndUp ? 650 : 320">
      <v-card-text>
        <form @submit.prevent="submit">
          <v-container>
            <InputsCrearEditarUsuario
              :correo="correo"
              :contrasena="contrasena"
              :rol="rol"
              :roles="roles"
              :is-editar="true"
            />
            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue"> Editar </v-btn>
            </div>
          </v-container>
          <div v-if="isLoading" class="ma-4 d-flex justify-center">
            <v-progress-circular
              :size="50"
              indeterminate
              color="blue"
            ></v-progress-circular>
          </div>
          <div class="ma-4 d-flex justify-center">
            <v-alert
              style="max-width: 320px"
              type="error"
              v-model="showRazonError"
              variant="tonal"
              closable
              close-label="Cerrar"
              title="Error"
              border="top"
            >
              {{ razonError }}
            </v-alert>
          </div>
        </form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="cerrarFormularioCancelar"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <DialogMensajeRequest
    v-if="dialogMensaje"
    :mensaje="`Usuario editado exitosamente`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
