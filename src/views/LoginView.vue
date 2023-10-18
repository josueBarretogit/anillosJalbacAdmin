<script lang="ts" setup>
import { inject } from "vue";

const submit = inject("submit");
</script>

<template>
  <div
    class="d-flex flex-column h-100 align-center justify-center"
    id="mainContainer"
  >
    <div class="ma-4 d-flex">
      <h1 class="ma-4 align-self-center">Login</h1>
    </div>
    <form @submit.prevent="submit" class="ma-4" style="min-width: 350px">
      <v-text-field
        class="ma-4"
        color="blue"
        variant="outlined"
        v-model="correo.value.value"
        :counter="10"
        :error-messages="correo.errorMessage.value"
        label="Correo"
      ></v-text-field>

      <v-text-field
        class="ma-4"
        color="blue"
        variant="outlined"
        v-model="contrasena.value.value"
        :counter="7"
        :error-messages="contrasena.errorMessage.value"
        label="contraseña"
      ></v-text-field>

      <div class="ma-4 d-flex justify-center">
        <v-btn type="submit" size="large" color="blue"> Iniciar sesión </v-btn>
      </div>

      <div v-if="isLoading" class="ma-4 d-flex justify-center">
        <v-progress-circular
          :size="50"
          indeterminate
          color="blue"
        ></v-progress-circular>
      </div>

      <div class="d-flex justify-center">
        <v-alert
          style="max-width: 320px"
          type="error"
          v-model="showAlert"
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
  </div>
</template>
