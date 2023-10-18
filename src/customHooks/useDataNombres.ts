import { getAnillos } from "@/services/anilloApi";
import { loggedState, creacionAnillos } from "@/variables/store";
import { ref, watch } from "vue";

export async function useDataNombres() {
  const isLoading = ref(true);
  const anillosDataTable = ref<any[]>();
  const page = ref(1);
  const totalItems = ref(6);
  const numPages = ref(1);
  const colKey = ref(0);

  function setNumPages(dataTable: Array<any>): number {
    return Math.ceil(
      (dataTable?.length as number) / totalItems.value,
    ) as number;
  }

  function sliceArray(
    array: Array<any>,
    start: number,
    end: number,
  ): Array<any> {
    return array?.slice(start * totalItems.value, end * totalItems.value);
  }

  loggedState.setToTrue();

  let anillosCopy = await getAnillos();

  anillosDataTable.value = anillosCopy?.slice(0, page.value * totalItems.value);

  numPages.value = setNumPages(anillosCopy as any[]);

  const forceRender = () => {
    colKey.value = colKey.value + 1;
  };

  isLoading.value = false;

  async function updatePage(index: number) {
    page.value = index;
    anillosDataTable.value = sliceArray(
      anillosCopy as any[],
      page.value - 1,
      page.value,
    );

    numPages.value = setNumPages(anillosCopy as any[]);
  }

  watch(
    () => creacionAnillos.isCreated,
    async () => {
      isLoading.value = true;
      anillosCopy = await getAnillos();
      isLoading.value = false;

      anillosDataTable.value = sliceArray(
        anillosCopy as any[],
        page.value - 1,
        page.value,
      );

      numPages.value = setNumPages(anillosCopy as any[]);

      forceRender();
    },
  );

  return { anillosDataTable, colKey, numPages, page, updatePage };
}
