import { reactive } from "vue";

export const loggedState = reactive({
  isLogged: false,

  token: "",

  setToken(token: string) {
    this.token = token;
  },

  setToTrue() {
    this.isLogged = true;
  },

  setToFalse() {
    this.isLogged = false;
  },
});
