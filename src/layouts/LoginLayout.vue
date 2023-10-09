<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useField, useForm } from "vee-validate";

const { handleSubmit } = useForm({
  validationSchema: {
    correo(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "El correo no es valido";
    },

    contrasena(value: string) {
      if (value?.length >= 7) return true;
      return "La contraseña tiene que ser al menos 7 caracteres";
    },
  },
});

const correo = useField("correo");
const contrasena = useField("contrasena");

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <div class="d-flex flex-column h-100 align-center">
    <div class="d-flex flex-grow-1">
      <h1 class="flex-grow-1 align-self-center">Login</h1>
    </div>
    <form @submit.prevent="submit" class="w-25 flex-grow-1">
      <v-text-field
        class="mb-3"
        color="blue"
        variant="outlined"
        v-model="correo.value.value"
        :counter="10"
        :error-messages="correo.errorMessage.value"
        label="Correo"
      ></v-text-field>

      <v-text-field
        class="mb-3"
        color="blue"
        variant="outlined"
        v-model="contrasena.value.value"
        :counter="7"
        :error-messages="contrasena.errorMessage.value"
        label="contraseña"
      ></v-text-field>

      <v-btn type="submit" size="large"> Iniciar sesión </v-btn>
    </form>
  </div>
</template>
