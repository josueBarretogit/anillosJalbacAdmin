import { Anillo, Dije, Solitario } from "@/interfaces/interfaces";
import { searches, tabs } from "@/variables/store";
import { Ref } from "vue";

export function filterByTerm(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Anillo[]).filter((anillo) => {
    const pesoPlataFormateado = anillo.pesoPlata.trim().replace(/\s/g, "");
    const pesoOroFormateado = anillo.pesoOro.trim().replace(/\s/g, "");
    const referenciaFormateada = "#" + anillo.referencia.trim();
    const talla = "talla" + anillo.talla.trim();
    return (
      pesoPlataFormateado.includes(searches.searchTerm) ||
      pesoOroFormateado.includes(searches.searchTerm) ||
      anillo.nombre.includes(searches.searchTerm) ||
      talla.includes(searches.searchTerm) ||
      anillo.categoria.includes(searches.searchTerm) ||
      referenciaFormateada.includes(searches.searchTerm)
    );
  });
}

export function filterByTermSolitario(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Solitario[]).filter((solitario) =>
    solitario.formaPiedra.includes(searches.searchTerm),
  );
}

export const updateDatatableOnFilter = (
  anillosDataTable: Ref<any[]>,
  dataCopy: any[],
  filterFunction: (data: any) => any,
  totalItems: Ref<number>,
  page: Ref<number>,
) => {
  if (searches.searchTerm) {
    anillosDataTable.value = filterFunction(dataCopy as any[]);
    console.log(searches.searchTerm);
    anillosDataTable.value = anillosDataTable?.value?.slice(
      0,
      page.value * totalItems.value,
    );
  } else {
    anillosDataTable.value = (dataCopy as any[])?.slice(
      0,
      page.value * totalItems.value,
    );
  }
};
