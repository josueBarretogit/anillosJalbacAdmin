
import type { Anillo } from '@/interfaces/interfaces';
import axios, { isCancel, AxiosError } from 'axios';
import type { Ref } from 'vue';

let anillos: Anillo[]

async function getAnillo(id: number, isLoading: boolean): Promise<Anillo | undefined> {
  try {
    const response = await axios.post('http://localhost:4000/api/anillos/getone', {
      id: id,
    })
    anillos = response.data

    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function getAnillos(): Promise<Anillo[] | undefined> {

  try {
    const response = await axios.get('http://localhost:4000/api/anillos/')
    anillos = response.data
    console.log(anillos)

    return response.data
  } catch (error) {
    console.log(error)
  }
}


export {
  getAnillos,
  anillos
}
