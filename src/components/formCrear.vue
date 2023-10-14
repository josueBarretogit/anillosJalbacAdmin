<script lang="ts" setup>
import { ref } from "vue";
import type { Anillo } from "./../interfaces/interfaces";
import { deleteAnillo, getAnillos } from "./../services/anilloApi";
import { AxiosError } from "axios";

const dialog = ref(false);

const dialog2 = ref(false);

function cerrarFormulario() {
  dialog2.value = false;
  dialog.value = false;
}

async function eliminarAnillo(id: number, token: string) {
  const response: Anillo | AxiosError = await deleteAnillo(id, token);
  console.log(id);
  console.log(response);
  if (response) {
    dialog2.value = true;
    await getAnillos();
  }
}

import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

      return "Phone number needs to be at least 9 digits.";
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    select(value) {
      if (value) return true;

      return "Select an item.";
    },
    checkbox(value) {
      if (value === "1") return true;

      return "Must be checked.";
    },
  },
});
const name = useField("name");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        color="blue"
        v-bind="props"
        prepend-icon="mdi-pen-plus"
        rounded="xl"
        size="large"
      >
        Crear anillo
      </v-btn>
    </template>

    <v-card class="">
      <v-card-text>
        <v-container>
          <form @submit.prevent="submit" class="d-flex flex-wrap">
            <v-text-field
              class="w-50 ma-1"
              v-model="name.value.value"
              :counter="10"
              :error-messages="name.errorMessage.value"
              label="Name"
            ></v-text-field>
            <v-text-field
              class="w-50 ma-1"
              v-model="phone.value.value"
              :counter="7"
              :error-messages="phone.errorMessage.value"
              label="Phone Number"
            ></v-text-field>

            <v-text-field
              class="w-50 ma-1"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
            ></v-text-field>

            <v-btn class="me-4" type="submit" color="blue">
              Crear anillo
            </v-btn>
          </form></v-container
        >
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialog2" width="auto">
    <v-card>
      <v-card-title>Operacion exitosa </v-card-title>
      <v-card-text> Anillo eliminado correctamente</v-card-text>
      <v-card-actions>
        <v-btn color="blue" variant="text" @click="cerrarFormulario">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
