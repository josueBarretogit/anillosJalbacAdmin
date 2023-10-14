<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useField, useForm } from "vee-validate";
import { logIn } from "./../services/anilloApi";
import { Login, TokenDecoded } from "./../interfaces/interfaces";
import { useRouter } from "vue-router";
import { loggedState } from "@/variables/store";
import jwt_decode from "jwt-decode";
const token = localStorage.getItem("accessToken");

const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: {
    correo(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      return "El correo no es valido";
    },

    contrasena(value: string) {
      if (value?.length >= 7) return true;
      return "La contraseña tiene que ser al menos 7 caracteres";
    },
  },
});

const correo = useField("correo");
const contrasena = useField("contrasena");
const showAlert = ref(false);
const isLoading = ref(false);
const razonError = ref("");

const submit = handleSubmit(async (values) => {
  isLoading.value = true;
  showAlert.value = false;
  const dataLogin: Login | undefined = await logIn(
    values.correo,
    values.contrasena,
  );

  isLoading.value = false;
  if (dataLogin?.isLogged) {
    loggedState.setToTrue();

    loggedState.setToken(token);
    localStorage.setItem("accessToken", dataLogin.accessToken);
    router.push({
      name: "viewAnillos",
      params: { correo: dataLogin.correo, id: dataLogin.idUsuario },
    });
  } else if (!dataLogin?.isLogged) {
    console.log(dataLogin);
    showAlert.value = true;
    razonError.value = dataLogin?.response as string;
  }
});
</script>

<template>
  <div
    class="d-flex flex-column h-100 align-center justify-center"
    id="mainContainer"
  >
    <div class="ma-4 d-flex">
      <h1 class="ma-4 align-self-center">Login</h1>
    </div>
    <form @submit.prevent="submit" class="ma-4" style="min-width: 350px">
      <v-text-field
        class="ma-4"
        color="blue"
        variant="outlined"
        v-model="correo.value.value"
        :counter="10"
        :error-messages="correo.errorMessage.value"
        label="Correo"
      ></v-text-field>

      <v-text-field
        class="ma-4"
        color="blue"
        variant="outlined"
        v-model="contrasena.value.value"
        :counter="7"
        :error-messages="contrasena.errorMessage.value"
        label="contraseña"
      ></v-text-field>

      <div class="ma-4 d-flex justify-center">
        <v-btn type="submit" size="large" color="blue"> Iniciar sesión </v-btn>
      </div>

      <div v-if="isLoading" class="ma-4 d-flex justify-center">
        <v-progress-circular
          :size="50"
          indeterminate
          color="blue"
        ></v-progress-circular>
      </div>

      <div class="d-flex justify-center">
        <v-alert
          style="max-width: 320px"
          type="error"
          v-model="showAlert"
          variant="tonal"
          closable
          close-label="Cerrar"
          title="Error"
          border="top"
        >
          {{ razonError }}
        </v-alert>
      </div>
    </form>
  </div>
</template>
