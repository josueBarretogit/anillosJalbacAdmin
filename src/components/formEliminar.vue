<script setup>
import { ref } from "vue";
let dialog = ref(false);
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <template v-slot:activator="{ props }">
      <v-btn color="red" v-bind="props" rounded="xl"> Eliminar </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-alert
              color="red"
              type="error"
              title="Eliminar"
              text="¿Estas seguro que deseas eliminar este anillo?"
            ></v-alert>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
