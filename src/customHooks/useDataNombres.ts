import { filterByTerm } from "@/helpers/helpers";
import { Anillo } from "@/interfaces/interfaces";
import useAnillosApi from "@/services/anilloApi";
import {
  loggedState,
  creacionAnillos,
  tabs,
  searches,
  dataCopy,
} from "@/variables/store";
import { ref, watch } from "vue";

export async function useDataAnillos(tipoJoya: string) {
  const isLoading = ref(true);
  const anillosDataTable = ref<any>();
  const page = ref(1);
  const totalItems = ref(6);
  const numPages = ref(1);
  const colKey = ref(0);

  const { getAnillos } = useAnillosApi();

  function setNumPages(dataTable: Array<Anillo>): number {
    return Math.ceil(
      (dataTable?.length as number) / totalItems.value,
    ) as number;
  }

  function sliceArray(
    array: Array<any>,
    start: number,
    end: number,
  ): Array<Anillo> {
    return array?.slice(start * totalItems.value, end * totalItems.value);
  }

  loggedState.setToTrue();

  let anillosCopy = await getAnillos(tipoJoya);

  if (tipoJoya == "nombres") {
    dataCopy.setCopyNombres(anillosCopy as any[]);
  } else if (tipoJoya == "solitarios") {
    dataCopy.setCopySolitarios(anillosCopy as any[]);
  } else if (tipoJoya == "dijes") {
    dataCopy.setCopyDijes(anillosCopy as any[]);
  }

  anillosDataTable.value = sliceArray(anillosCopy as Anillo[], 0, page.value);

  numPages.value = setNumPages(anillosCopy as Anillo[]);

  const forceRender = () => {
    colKey.value = colKey.value + 1;
  };

  isLoading.value = false;

  function updatePage(index: number) {
    page.value = index;
    if (searches.searchTerm) {
      anillosDataTable.value = sliceArray(
        tipoJoya == "nombres"
          ? dataCopy.copyNombres
          : tipoJoya == "solitarios"
          ? dataCopy.copySolitarios
          : tipoJoya == "dijes"
          ? dataCopy.copyDijes
          : [],
        page.value - 1,
        page.value,
      );
      numPages.value = setNumPages(dataCopy.copy as any[]);
    } else {
      anillosDataTable.value = sliceArray(
        anillosCopy as Anillo[],
        page.value - 1,
        page.value,
      );
      numPages.value = setNumPages(anillosCopy as Anillo[]);
    }
  }

  async function updateDataTable() {
    isLoading.value = true;
    anillosCopy = await getAnillos(tipoJoya);

    if (tipoJoya == "nombres") {
      dataCopy.setCopyNombres(anillosCopy as any[]);
    } else if (tipoJoya == "solitarios") {
      dataCopy.setCopySolitarios(anillosCopy as any[]);
    } else if (tipoJoya == "dijes") {
      dataCopy.setCopyDijes(anillosCopy as any[]);
    }
    isLoading.value = false;

    anillosDataTable.value = sliceArray(
      anillosCopy as Anillo[],
      page.value - 1,
      page.value,
    );

    numPages.value = setNumPages(anillosCopy as Anillo[]);

    forceRender();
  }

  watch(
    () => creacionAnillos.isCreated,
    () => {
      updateDataTable();
    },
  );

  watch(
    () => creacionAnillos.isCreatedSolitario,
    () => {
      updateDataTable();
    },
  );

  watch(
    () => creacionAnillos.isCreatedDije,
    () => {
      updateDataTable();
    },
  );

  return {
    anillosDataTable,
    colKey,
    numPages,
    page,
    updatePage,
    totalItems,
    anillosCopy,
    setNumPages,
  };
}
