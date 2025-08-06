import * as jsonfile from 'jsonfile';
import path from 'path';

const pelisPath = path.join(__dirname, 'pelis.json');


type Peli = {
  id: number;
  title: string;
  tags: string[];
};

class PelisCollection {
  async getAll(): Promise<Peli[]> {
  try {
    return await jsonfile.readFile(pelisPath);
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return []; // Retornar un array vacío en caso de error
  }
}

  async getById(id: number): Promise<Peli | undefined> {
  const pelis = await this.getAll();
  return pelis.find((p) => p.id === id);
}

  async add(peli: Peli): Promise<boolean> {
  try {
    const pelis = await this.getAll(); // Asegúrate de que esto esté funcionando
    const existe = pelis.find((p) => p.id === peli.id);

    if (existe) {
      return false; // No agregar si ya existe
    }

    pelis.push(peli); // Agregar la nueva peli
    await jsonfile.writeFile(pelisPath, pelis); // Escribir el archivo completo

    return true; // Agregado exitosamente
  } catch (error) {
    console.error("Error en add:", error);
    return false; // Retornar false en caso de error
  }
}

  async search(options: { title?: string; tag?: string | string[] }) {
  const lista = await this.getAll();

  const listaFiltrada = lista.filter((p) => {
  if (options.tag && options.title) {
    const tagsArray = Array.isArray(options.tag) ? options.tag : [options.tag];
    const cumpleTag = p.tags && tagsArray.some((tag) => p.tags.includes(tag));
    const cumpleTitle = p.title && p.title.toLowerCase().includes(options.title.toLowerCase());
    return cumpleTag && cumpleTitle;
  } else if (options.tag) {
    const tagsArray = Array.isArray(options.tag) ? options.tag : [options.tag];
    return p.tags && tagsArray.some((tag) => p.tags.includes(tag));
  } else if (options.title) {
    return p.title && p.title.toLowerCase().includes(options.title.toLowerCase());
  } else {
    return true; // Sin filtro devuelve todo
  }
});

  return listaFiltrada;
}
}

export { PelisCollection, Peli };
export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};