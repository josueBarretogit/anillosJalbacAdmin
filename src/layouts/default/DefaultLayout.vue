<template>
  <v-app>
    <MainAppBar />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import MainAppBar from "./MainAppBar.vue";
</script>
