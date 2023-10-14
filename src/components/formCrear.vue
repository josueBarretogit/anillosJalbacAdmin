<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

import type { Anillo } from "./../interfaces/interfaces";
import { deleteAnillo, getAnillos } from "./../services/anilloApi";
import { AxiosError } from "axios";
import { useDisplay } from "vuetify";

const { name, mobile, smAndUp } = useDisplay();
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
    nameFORM(value) {
      if (value?.length >= 2) return true;

      return "nameFORM needs to be at least 2 characters.";
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
const nameFORM = useField("nameFORM");
const phone = useField("phone");
const email = useField("email");
const select = useField("select");
const checkbox = useField("checkbox");

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
const widthSize = computed(() => {
  // nameFORM is reactive and
  // must use .value
  switch (name.value) {
    case "xs":
      return 300;
    case "sm":
      return 800;
    case "md":
      return 1000;
    case "lg":
      return 12000;
  }

  return undefined;
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

    <v-card :width="smAndUp ? 650 : 320">
      <v-card-text>
        <form @submit.prevent="submit">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="nameFORM.value.value"
                  :counter="10"
                  :error-messages="nameFORM.errorMessage.value"
                  label="nameFORM"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="phone.value.value"
                  :counter="7"
                  :error-messages="phone.errorMessage.value"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="nameFORM.value.value"
                  :counter="10"
                  :error-messages="nameFORM.errorMessage.value"
                  label="nameFORM"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="phone.value.value"
                  :counter="7"
                  :error-messages="phone.errorMessage.value"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="nameFORM.value.value"
                  :counter="10"
                  :error-messages="nameFORM.errorMessage.value"
                  label="nameFORM"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="phone.value.value"
                  :counter="7"
                  :error-messages="phone.errorMessage.value"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="nameFORM.value.value"
                  :counter="10"
                  :error-messages="nameFORM.errorMessage.value"
                  label="File"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn class="me-4" type="submit" color="blue">
              Crear anillo
            </v-btn>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions>
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
