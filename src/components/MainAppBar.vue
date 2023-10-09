<script setup lang="ts">
import { ref } from "vue";

const showAdminButtons = ref(false);
</script>

<template>
  <v-app-bar color="grey-darken-4">
    <v-app-bar-title>Jalbac Admin</v-app-bar-title>
    <v-btn
      v-if="showAdminButtons"
      size="large"
      color="blue"
      prepend-icon="mdi-pen-plus"
    >
      Agregar Anillo
    </v-btn>

    <v-btn v-else size="large" color="blue" prepend-icon="mdi-pen-plus">
      Login
    </v-btn>
  </v-app-bar>
</template>
