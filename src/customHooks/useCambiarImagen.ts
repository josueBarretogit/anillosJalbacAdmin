import { getExistingImage } from "@/services/anilloApi";

export function useCambiarImagen(imageName: string) {
  const image = async () => await getExistingImage(imageName, undefined);

  const submit = async () => {
    const response = await getExistingImage(imageName, undefined);
    console.log(response);
  };
  return { submit };
}
