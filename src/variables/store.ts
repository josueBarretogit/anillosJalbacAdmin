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
