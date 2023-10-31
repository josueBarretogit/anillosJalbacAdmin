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
});

export const imageReplacing = reactive({
  isLoading: false,
  setIsLoading(value: boolean) {
    this.isLoading = value;
  },
});
