<template>
  <v-app>
    <MainAppBar />

    <v-main>
      <Suspense>
        <template class="d-flex justify-center align-center" #fallback>
          <div class="d-flex justify-center">
            <v-progress-circular
              :size="50"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
        <router-view />
      </Suspense>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import MainAppBar from "./MainAppBar.vue";
</script>
