<script setup lang="ts">
import { useRouter } from "vue-router";
const token = localStorage.getItem("accessToken");
const router = useRouter();

console.log(token);
if (token) router.push({ name: "viewNombres" });
</script>
<template>
  <router-view />
</template>
