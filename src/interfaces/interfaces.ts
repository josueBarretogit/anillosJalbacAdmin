export interface Anillo {
  categoria: string;
  nombre: string;
  talla: string;
  foto: string;
  referencia: string;
  pesoOro: string;
  pesoPlata: string;
}

export interface Dije {
  alto: string;
  ancho: string;
  categoria: string;
  foto: string;
  referencia: string;
  pesoOro: string;
  pesoPlata: string;
}

export interface Login {
  isLogged: boolean;
  idUsuario: number | string;
  correo: string;
  accessToken: string;
}
