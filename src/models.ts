import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];

  
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const data = await jsonfile.readFile("./pelis.json");
    return data;
}

  
async add(peli: Peli): Promise<boolean> {
  const pelis = await this.getAll();
  const exists = pelis.some((p) => p.id === peli.id);
  if (exists) {
    return false;
  } else {
    pelis.push(peli);
    await jsonfile.writeFile("./pelis.json", pelis);
    return true;
  }
}

async getById(id: number): Promise<Peli | undefined> {
  const pelis = await this.getAll();
  return pelis.find((p) => p.id === id);
}

async search(options: SearchOptions): Promise<Peli[]> {
  const lista = await this.getAll();

  const listaFiltrada = await lista.filter((peli) => {
    let esteva = false;

    if (options.tag && peli.tags.includes(options.tag)) {
      esteva = true;
    }

    if (options.title && peli.title.includes(options.title)) {
      esteva = true;
    }

    return esteva;
  });

  return listaFiltrada;
}
}

export { PelisCollection, Peli,SearchOptions };
