import { LoginResponse } from "@/interfaces/interfaces";
import { logIn } from "@/services/anilloApi";
import { loggedState, usuario } from "@/variables/store";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { drawer } from "@/variables/store";

export function useLogin() {
  drawer.setDrawer(false);
  const token = localStorage.getItem("accessToken");

  const router = useRouter();

  loggedState.setToFalse();

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
    const dataLogin: LoginResponse | undefined = await logIn(
      values.correo,
      values.contrasena,
    );

    console.log(dataLogin);
    isLoading.value = false;
    if (dataLogin?.isLogged) {
      loggedState.setToTrue();
      usuario.setUsuario(dataLogin.usuario);

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
