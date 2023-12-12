import { Usuario } from "@/interfaces/interfaces";
import { reactive, ref } from "vue";
export const authorization = reactive({
  authorizationToken: "",
  setAuthorizationToken(token: string) {
    this.authorizationToken = token;
  },
});

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

  isCreatedSolitario: 0,
  setIsCreatedSolitario(created: number) {
    this.isCreatedSolitario = created;
  },

  isCreatedDije: 0,
  setIsCreatedDije(created: number) {
    this.isCreatedDije = created;
  },
});

export const tabs = reactive({
  tabs: "nombres",
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

export const drawer = reactive({
  visitedUsuariosView: false,
  setVisitedUsuariosView(value: boolean) {
    this.visitedUsuariosView = value;
  },
  drawer: false,
  setDrawer(value: boolean) {
    console.log(this.drawer);
    this.drawer = value;
  },
});

let UsuarioInterface: Usuario = {
  correo: "",
  contrasena: "",
  rol: "Administrador",
  estado: false,
  id: 1,
};

export const usuarioStore = reactive({
  UsuarioInterface,

  setUsuario(usuario: Usuario) {
    console.log(usuario);
    this.UsuarioInterface = usuario;
  },

  setCorreo(value: string) {
    this.UsuarioInterface.correo = value;
  },

  setRol(value: "Administrador" | "Empleado") {
    this.UsuarioInterface.rol = value;
  },

  isRegistered: 0,
  setIsRegistered(value: number) {
    this.isRegistered = value;
  },
});

export const searches = reactive({
  placeholderSearchBar: "nombres",

  setPlaceHolderSearchBar(term: string) {
    this.placeholderSearchBar = term.trim().toLowerCase();
  },

  searchTerm: "",
  setSearchTerm(term: string) {
    this.searchTerm = term.toLowerCase().trim().replace(/\s/g, "");
  },

  searchTermUsuario: "",
  setSearchTermUsuario(term: string) {
    this.searchTermUsuario = term.toLowerCase().trim().replace(/\s/g, "");
  },
});

export const dataCopy = reactive({
  copy: [0],
  setCopy(data: any[]) {
    this.copy = data;
  },
  copyNombres: [0],
  setCopyNombres(data: any[]) {
    this.copyNombres = data;
  },
  copySolitarios: [0],
  setCopySolitarios(data: any[]) {
    this.copySolitarios = data;
  },

  copyDijes: [0],
  setCopyDijes(data: any[]) {
    this.copyDijes = data;
  },
});
