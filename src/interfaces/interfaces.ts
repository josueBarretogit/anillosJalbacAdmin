export interface Anillo {
  categoria: string;
  nombre: string;
  talla: string;
  foto: string;
  referencia: string;
  pesos: Peso[];
}
export interface Dije {
  alto: string;
  ancho: string;
  categoria: string;
  foto: string;
  referencia: string;
  pesos: Peso[];
}

export interface Peso {
  pesoOro: string;
  pesoPlata: string;
}

