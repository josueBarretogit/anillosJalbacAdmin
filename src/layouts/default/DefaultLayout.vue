<template>
  <v-app>
    <v-main>
      <main-app-bar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MainAppBar from "./MainAppBar.vue";
</script>
