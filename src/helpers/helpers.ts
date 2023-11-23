import { Anillo, Dije, Solitario } from "@/interfaces/interfaces";
import { searches, tabs } from "@/variables/store";

export function filterByTerm(dataTable: Anillo[] & Solitario[] & Dije[]): any {
  if (!searches.searchTerm) return dataTable;
  if (tabs.tabs == "nombres") {
    return dataTable.filter((anillo) =>
      anillo.pesoPlata.includes(searches.searchTerm),
    );
  } else if (tabs.tabs == "solitarios") {
    return (dataTable as Solitario[]).filter((solitario) =>
      solitario.formaPiedra.includes(searches.searchTerm),
    );
  }
}
