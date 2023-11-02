import { reactive, ref } from "vue";

export const loggedState = reactive({
  isLogged: false,

  token: "",

  setToken(token: any) {
    this.token = token;
  },

  cookie: "",

  setCookie(cookie: any) {
    this.cookie = cookie;
  },

  setToTrue() {
    this.isLogged = true;
  },

  setToFalse() {
    this.isLogged = false;
  },
});

export const creacionAnillos = reactive({
  isCreated: 0,

  setIsCreated(created: number) {
    this.isCreated = created;
    console.log(this.isCreated);
  },
});

export const tabs = reactive({
  tabs: "anillos",

  setTabs(tab: string) {
    this.tabs = tab;
  },
});

export const dialogRequestExitoso = reactive({
  isShow: false,
  setIsShow(value: boolean) {
    this.isShow = value;
  },

  mensajeError: "",
  setMensajeError(value: string) {
    this.mensajeError = value;
  },

  fallo: false,
  setFallo(value: boolean) {
    this.fallo = value;
  },
});

export const imageReplacing = reactive({
  isLoading: false,
  setIsLoading(value: boolean) {
    this.isLoading = value;
  },

  falloReplace: false,
  setFalloReplace(value: boolean) {
    this.falloReplace = value;
  },

  idAnilloLoading: 0,
  setIdAnilloLoading(value: number) {
    this.idAnilloLoading = value;
  },
});
