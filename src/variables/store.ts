import { reactive } from "vue";

export const loggedState = reactive({
  isLogged: false,
  updateLogInState() {
    this.isLogged = !this.isLogged;
  },
});
