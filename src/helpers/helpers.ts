import { Anillo, Dije, Solitario } from "@/interfaces/interfaces";
import { searches, tabs } from "@/variables/store";

export function filterByTerm(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Anillo[]).filter((anillo) => {
    const pesoPlataFormateado = anillo.pesoPlata.trim().replace(/\s/g, "");
    console.log(pesoPlataFormateado);
    return pesoPlataFormateado.includes(searches.searchTerm);
  });
}

export function filterByTermSolitario(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Solitario[]).filter((solitario) =>
    solitario.formaPiedra.includes(searches.searchTerm),
  );
}
