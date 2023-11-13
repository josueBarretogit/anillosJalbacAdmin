<script lang="ts" setup>
import DialogMensajeRequest from "../dialogMensajeRequest.vue";
import { ref } from "vue";
import { useFormCrearUsuario } from "@/customHooks/usuariosHooks/useFormcrearUsuario";
import { dialogRequestExitoso } from "@/variables/store";
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
} = useFormCrearUsuario();
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto" scrim="#000000">
    <template v-slot:activator="{ props }">
      <v-btn color="blue" v-bind="props" icon="mdi-plus" rounded="xl"> </v-btn>
    </template>

    <v-card :width="smAndUp ? 650 : 320">
      <v-card-text>
        <form @submit.prevent="submit">
          <v-container>
            <v-row no-gutters justify="center" class="mt-3 mb-3">
              <v-col>
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="correo.value.value"
                  :error-messages="correo.errorMessage.value"
                  label="correo"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row no-gutters justify="center" class="mt-3 mb-3">
              <v-col>
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="contrasena.value.value"
                  :error-messages="contrasena.errorMessage.value"
                  label="contraseña"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center" class="mt-3 mb-3">
              <v-col>
                <v-select
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="rol.value.value as string"
                  :error-messages="rol.errorMessage.value"
                  :items="roles"
                  label="Rol"
                ></v-select>
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue">
                Registrar usuario
              </v-btn>
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
    :mensaje="`Usuario creado exitosamente`"
    :fallo="dialogRequestExitoso.fallo"
    :mensaje-error="`${dialogRequestExitoso.mensajeError}`"
  />
</template>
