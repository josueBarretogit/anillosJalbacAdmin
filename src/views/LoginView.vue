<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useField, useForm } from "vee-validate";
import { logIn } from "./../services/anilloApi";
import { Login } from "./../interfaces/interfaces";
import { useRouter } from "vue-router";
import { loggedState } from "@/variables/store";

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
const alert = ref(false);
const submit = handleSubmit(async (values) => {
  const dataLogin: Login | undefined = await logIn(
    values.correo,
    values.contrasena,
  );

  if (dataLogin?.isLogged) {
    loggedState.updateLogInState();
    router.push({
      name: "viewAnillos",
      params: { correo: dataLogin.correo, id: dataLogin.idUsuario },
    });
  } else if (!dataLogin?.isLogged) {
    alert.value = true;
  }
});
</script>

<template>
  <div class="ma-4 d-flex flex-column h-100 align-center justify-center">
    <div class="ma-4 d-flex">
      <h1 class="ma-4 align-self-center">Login</h1>
    </div>
    <form @submit.prevent="submit" class="w-25 ma-4">
      <v-text-field
        class="ma-4 mb-3"
        color="blue"
        variant="outlined"
        v-model="correo.value.value"
        :counter="10"
        :error-messages="correo.errorMessage.value"
        label="Correo"
      ></v-text-field>

      <v-text-field
        class="ma-4 mb-3"
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

      <v-alert
        type="error"
        v-model="alert"
        variant="tonal"
        closable
        close-label="Cerrar"
        title="Error"
        border="top"
        >El usuario no esta registrado o la contraseña es incorrecta</v-alert
      >
    </form>
  </div>
</template>
