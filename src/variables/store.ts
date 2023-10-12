import { reactive } from "vue";

export const loggedState = reactive({
  isLogged: false,

  setToTrue() {
    this.isLogged = true;
  },

  setToFalse() {
    this.isLogged = false;
  },
});
