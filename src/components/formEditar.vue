<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { createAnillo } from "./../services/anilloApi";
import { useDisplay } from "vuetify";
import { creacionAnillos } from "./../variables/store";
const { smAndUp } = useDisplay();
const dialog = ref(false);

const dialog2 = ref(false);

function cerrarFormularioCrear() {
  dialog2.value = false;
  dialog.value = false;
}

const token = localStorage.getItem("accessToken");

import { useField, useForm } from "vee-validate";

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    nombre(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    pesoOro(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    pesoPlata(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    categoria(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    talla(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    referencia(value: string) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
    imagen(value: File[]) {
      if (!value) {
        return "Este campo es obligatorio";
      }
      return true;
    },
  },
});

const nombre = useField("nombre");
const pesoOro = useField("pesoOro");
const pesoPlata = useField("pesoPlata");
const categoria = useField("categoria");
const talla = useField("talla");
const referencia = useField("referencia");
const imagen = useField<File[]>("imagen");

const submit = handleSubmit(async (values) => {
  const valuesForm = new FormData();
  valuesForm.append("nombre", values.nombre);
  valuesForm.append("pesoOro", values.pesoOro);
  valuesForm.append("pesoPlata", values.pesoPlata);
  valuesForm.append("categoria", values.categoria);
  valuesForm.append("talla", values.talla);
  valuesForm.append("referencia", values.referencia);
  valuesForm.append("image", values.imagen[0]);

  const response = await createAnillo(valuesForm, token as string);
  console.log(response);
  if (response) {
    dialog2.value = true;
    creacionAnillos.setIsCreated(creacionAnillos.isCreated + 1);
    handleReset();
  }
});
</script>

<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <template v-slot:activator="{ props }">
      <v-btn
        prepend-icon="mdi-pencil"
        color="blue"
        v-bind="props"
        rounded="xl"
        size="large"
      >
        Editar anillo
      </v-btn>
    </template>

    <v-card :width="smAndUp ? 650 : 320">
      <v-card-text>
        <form @submit.prevent="submit">
          <v-container>
            <v-row no-gutters class="mt-3 mb-3">
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="nombre.value.value"
                  :error-messages="nombre.errorMessage.value"
                  label="nombre"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="categoria.value.value"
                  :error-messages="categoria.errorMessage.value"
                  label="Categoria"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-3 mb-3">
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="pesoOro.value.value"
                  :error-messages="pesoOro.errorMessage.value"
                  label="Peso oro"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="pesoPlata.value.value"
                  :error-messages="pesoPlata.errorMessage.value"
                  label="Peso plata"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-3 mb-3">
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="referencia.value.value"
                  :error-messages="referencia.errorMessage.value"
                  label="Referencia"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  color="blue"
                  variant="outlined"
                  class="ml-4 mr-4"
                  v-model="talla.value.value"
                  :error-messages="talla.errorMessage.value"
                  label="Talla"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify="center" class="mt-3 mb-3">
              <v-col>
                <v-file-input
                  accept="image/*"
                  class="ml-4 mr-4"
                  clearable
                  label="Imagen"
                  color="blue"
                  variant="outlined"
                  v-model="imagen.value.value"
                  :error-messages="imagen.errorMessage.value"
                ></v-file-input>
              </v-col>
            </v-row>
            <div class="d-flex justify-center">
              <v-btn class="me-4" type="submit" color="blue">
                Editar anillo
              </v-btn>
            </div>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialog2" width="auto">
    <v-card>
      <v-card-title>Operacion exitosa </v-card-title>
      <v-card-text> Anillo creado correctamente</v-card-text>
      <v-card-actions>
        <v-btn color="blue" variant="text" @click="cerrarFormularioCrear">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
