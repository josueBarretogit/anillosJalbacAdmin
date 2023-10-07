<script lang="ts" setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

const { handleSubmit } = useForm({
  validationSchema: {
    name(value: string) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value: string) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

      return "Phone number needs to be at least 9 digits.";
    },
    email(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    select(value: string) {
      if (value) return true;

      return "Select an item.";
    },
    checkbox(value: string) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});

const name = useField("name");
const phone = useField("phone");

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <div class="d-flex justify-center h-100 align-center">
    <form @submit.prevent="submit" class="w-50">
      <v-text-field
        class="mb-3"
        color="blue"
        variant="outlined"
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Correo"
      ></v-text-field>

      <v-text-field
        class="mb-3"
        color="blue"
        variant="outlined"
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="contraseña"
      ></v-text-field>

      <v-btn type="submit" size="large"> Iniciar sesión </v-btn>
    </form>
  </div>
</template>
