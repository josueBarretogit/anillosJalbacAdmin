import { LoginResponse } from "@/interfaces/interfaces";
import { logIn } from "@/services/anilloApi";
import { loggedState, usuarioStore } from "@/variables/store";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { drawer } from "@/variables/store";
import { validationSchemaLogIn } from "./validationSchema/validationSchemaUsuario";

export function useLogin() {
  drawer.setDrawer(false);
  const token = localStorage.getItem("accessToken");

  const router = useRouter();

  loggedState.setToFalse();

  const { handleSubmit } = useForm({
    validationSchema: validationSchemaLogIn,
  });

  const correo = useField("correo");
  const contrasena = useField("contrasena");
  const showAlert = ref(false);
  const isLoading = ref(false);
  const razonError = ref("");

  const submit = handleSubmit(async (values) => {
    isLoading.value = true;
    showAlert.value = false;
    const dataLogin: LoginResponse | undefined = await logIn(
      values.correo,
      values.contrasena,
    );

    console.log(dataLogin);
    isLoading.value = false;
    if (dataLogin?.isLogged) {
      loggedState.setToTrue();
      usuarioStore.setUsuario(dataLogin.usuario);

      loggedState.setToken(token);
      localStorage.setItem("accessToken", dataLogin.accessToken);

      router.push({
        name: "viewNombres",
      });
    } else if (!dataLogin?.isLogged) {
      showAlert.value = true;
      razonError.value = dataLogin?.response as string;
    }
  });
  return { submit, correo, contrasena, showAlert, isLoading, razonError };
}
