export interface Anillo {
  id: number;
  categoria: string;
  nombre: string;
  talla: string;
  foto: string;
  referencia: string;
  pesoOro: string;
  pesoPlata: string;
}

export interface Dije {
  id: number;
  alto: string;
  ancho: string;
  categoria: string;
  foto: string;
  referencia: string;
  pesoOro: string;
  pesoPlata: string;
}

export interface Solitario {
  id: number;
  formaPiedra: string;
  tamanoPiedra: string;
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
  response: string;
}

export interface TokenDecoded {
  correo: string;
  idUsuario: number;
}

export interface CreateError {
  response: {
    data: {
      response: string;
    };
  };
}

export interface Usuario {
  id: number;
  correo: string;
  contrasena: string;
  rol: number;
}
