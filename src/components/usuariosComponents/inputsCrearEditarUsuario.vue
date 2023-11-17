<script setup lang="ts">
import { FieldContext } from "vee-validate";
import { ref } from "vue";

defineProps<{
  correo: FieldContext;
  contrasena: FieldContext;
  rol: FieldContext;
  roles: readonly any[];
  isEditar?: boolean | undefined;
}>();

const rules = {
  required: (value: string) =>
    value?.length >= 7 || "La contraseña tiene que ser al menos 7 caracteres",
};
</script>

<template>
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

  <v-row no-gutters justify="center" class="mt-3 mb-3" v-if="!isEditar">
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
  <v-row no-gutters justify="center" class="mt-3 mb-3" v-if="isEditar">
    <v-col>
      <v-text-field
        color="blue"
        variant="outlined"
        class="ml-4 mr-4"
        v-model="contrasena.value.value"
        :error-messages="contrasena.errorMessage.value"
        :rules="[rules.required]"
        label="Contraseña nueva"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
