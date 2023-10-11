<template>
  <v-app>
    <MainAppBar />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MainAppBar from "./MainAppBar.vue";
</script>
