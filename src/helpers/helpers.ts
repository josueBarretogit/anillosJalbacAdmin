import { Anillo, Dije, Solitario } from "@/interfaces/interfaces";
import { searches, tabs } from "@/variables/store";
import { Ref } from "vue";

function commonProperties(entity: Anillo | Solitario | Dije): any {
  return {
    pesoPlataFormateado:
      "pesoplata" + entity.pesoPlata.trim().replace(/\s/g, ""),
    pesoOroFormateado: "pesoplata" + entity.pesoOro.trim().replace(/\s/g, ""),
    referenciaFormateada: "#" + entity.referencia.trim(),
  };
}

export function filterByTerm(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Anillo[]).filter((anillo) => {
    const { pesoPlataFormateado, pesoOroFormateado, referenciaFormateada } =
      commonProperties(anillo);
    const talla = "talla" + anillo.talla.trim();
    return (
      pesoPlataFormateado.includes(searches.searchTerm) ||
      pesoOroFormateado.includes(searches.searchTerm) ||
      anillo.nombre.includes(searches.searchTerm) ||
      talla.includes(searches.searchTerm) ||
      anillo.categoria.toLowerCase().includes(searches.searchTerm) ||
      referenciaFormateada.includes(searches.searchTerm)
    );
  });
}

export function filterByTermSolitario(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Solitario[]).filter((solitario) => {
    const { pesoPlataFormateado, pesoOroFormateado, referenciaFormateada } =
      commonProperties(solitario);
    const talla = "talla" + solitario.talla.trim();
    const tamanoPiedra = solitario.tamanoPiedra.trim().replace(/\s/g, "");
    return (
      solitario.formaPiedra.includes(searches.searchTerm) ||
      pesoPlataFormateado.includes(searches.searchTerm) ||
      pesoOroFormateado.includes(searches.searchTerm) ||
      referenciaFormateada.includes(searches.searchTerm) ||
      talla.includes(searches.searchTerm) ||
      tamanoPiedra.includes(searches.searchTerm)
    );
  });
}

export function filterByTermDije(dataTable: any): any {
  if (!searches.searchTerm) return dataTable;
  return (dataTable as Dije[]).filter((dije) => {
    const { pesoPlataFormateado, pesoOroFormateado, referenciaFormateada } =
      commonProperties(dije);
    const altura = "altura" + dije.alto.trim().replace(/\s/g, "");
    const anchura = "anchura" + dije.ancho.trim().replace(/\s/g, "");
    return (
      dije.categoria.includes(searches.searchTerm) ||
      pesoPlataFormateado.includes(searches.searchTerm) ||
      pesoOroFormateado.includes(searches.searchTerm) ||
      referenciaFormateada.includes(searches.searchTerm) ||
      anchura.includes(searches.searchTerm) ||
      altura.includes(searches.searchTerm)
    );
  });
}

export const updateDatatableOnFilter = (
  anillosDataTable: Ref<any[]>,
  dataCopy: any[],
  filterFunction: (data: any) => any,
  totalItems: Ref<number>,
  page: Ref<number>,
  numPages: Ref<number>,
  setNumPages: (data: any[]) => any,
): any => {
  if (searches.searchTerm) {
    anillosDataTable.value = filterFunction(dataCopy as any[]);
    numPages.value = setNumPages(anillosDataTable.value);
    anillosDataTable.value = anillosDataTable?.value?.slice(
      0,
      page.value * totalItems.value,
    );
    page.value = 1;
  } else {
    anillosDataTable.value = (dataCopy as any[])?.slice(
      0,
      page.value * totalItems.value,
    );

    numPages.value = setNumPages(dataCopy);
  }
};
