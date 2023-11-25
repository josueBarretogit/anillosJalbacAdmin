<script setup lang="ts">
import { useRouter } from "vue-router";
import { drawer, tabs } from "@/variables/store";

const router = useRouter();
function goToHome() {
  router.push({
    name: "viewNombres",
  });
  tabs.tabs = "nombres";
  drawer.setVisitedUsuariosView(false);
}
</script>
<template>
  <v-btn color="blue-darken-1" variant="tonal" @click="goToHome"
    >Regresar</v-btn
  >
</template>
