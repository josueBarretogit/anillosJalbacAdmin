import { filterByTerm } from "@/helpers/helpers";
import { Anillo } from "@/interfaces/interfaces";
import { getAnillos } from "@/services/anilloApi";
import {
  loggedState,
  creacionAnillos,
  tabs,
  searches,
} from "@/variables/store";
import { ref, watch } from "vue";

export async function useDataNombres() {
  const isLoading = ref(true);
  const anillosDataTable = ref<Anillo[]>();
  const page = ref(1);
  const totalItems = ref(6);
  const numPages = ref(1);
  const colKey = ref(0);

  function setNumPages(dataTable: Array<Anillo>): number {
    return Math.ceil(
      (dataTable?.length as number) / totalItems.value,
    ) as number;
  }

  function sliceArray(
    array: Array<Anillo>,
    start: number,
    end: number,
  ): Array<Anillo> {
    return array?.slice(start * totalItems.value, end * totalItems.value);
  }

  loggedState.setToTrue();

  let anillosCopy = await getAnillos("nombres");

  anillosDataTable.value = sliceArray(
    anillosCopy as Anillo[],
    0,
    page.value * totalItems.value,
  );

  numPages.value = setNumPages(anillosCopy as Anillo[]);

  const forceRender = () => {
    colKey.value = colKey.value + 1;
  };

  isLoading.value = false;

  function updatePage(index: number) {
    page.value = index;
    anillosDataTable.value = sliceArray(
      anillosCopy as Anillo[],
      page.value - 1,
      page.value,
    );

    numPages.value = setNumPages(anillosCopy as Anillo[]);
  }

  async function updateDataTable() {
    isLoading.value = true;
    anillosCopy = await getAnillos("nombres");

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
    () => searches.searchTerm,
    () => {
      console.log("buscando");
      if (searches.searchTerm) {
        anillosDataTable.value = filterByTerm(anillosCopy as Anillo[]);
        console.log(searches.searchTerm);
        anillosDataTable.value = anillosDataTable?.value?.slice(
          0,
          page.value * totalItems.value,
        );
      } else {
        anillosDataTable.value = (anillosCopy as Anillo[])?.slice(
          0,
          page.value * totalItems.value,
        );
      }
    },
  );

  return { anillosDataTable, colKey, numPages, page, updatePage };
}
