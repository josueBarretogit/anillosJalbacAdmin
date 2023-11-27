import { Anillo, Dije, Solitario, Usuario } from "@/interfaces/interfaces";
import { dataCopy, searches, tabs } from "@/variables/store";
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

export function filterByTermUsuario(dataTable: Usuario[]): Usuario[] {
  if (!searches.searchTermUsuario) return dataTable;
  return dataTable.filter((usuario) => {
    const estado = usuario.estado ? "activo" : "inactivo";
    return (
      usuario.correo.toLowerCase().includes(searches.searchTermUsuario) ||
      usuario.rol.toLowerCase().includes(searches.searchTermUsuario) ||
      estado == searches.searchTermUsuario
    );
  });
}

export const updateDatatableOnFilter = (
  anillosDataTable: Ref<any[]>,
  anillosCopy: any[],
  filterFunction: (data: any) => any,
  totalItems: Ref<number>,
  page: Ref<number>,
  numPages: Ref<number>,
  setNumPages: (data: any[]) => any,
): any => {
  if (searches.searchTerm) {
    const filteredData = filterFunction(anillosCopy as any[]);
    dataCopy.setCopy(filteredData);
    numPages.value = setNumPages(filteredData);
    anillosDataTable.value = filteredData?.slice(
      0,
      page.value * totalItems.value,
    );
    page.value = 1;
  } else {
    anillosDataTable.value = (anillosCopy as any[])?.slice(
      0,
      page.value * totalItems.value,
    );

    numPages.value = setNumPages(anillosCopy);
  }
};
