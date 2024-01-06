import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];

  constructor(id: number, title: string, tags: string[]) {
    this.id = id;
    this.title = title || "";
    this.tags = tags || [];
  }
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  private filePath: string;

  constructor(filePath: string = "./pelis.json") {
    this.filePath = filePath;
  }

  private async readFile(): Promise<Peli[]> {
    try {
      const data: any[] = await jsonfile.readFile(this.filePath);
      const pelis: Peli[] = data.map((item: any) => new Peli(item.id, item.title, item.tags));
      return pelis || [];
    } catch (error: any) {
      console.error("Error reading file:", error.message);
      return [];
    }
  }

  private async writeFile(data: Peli[]): Promise<void> {
    try {
      await jsonfile.writeFile(this.filePath, data);
    } catch (error: any) {
      console.error("Error writing file:", error.message);
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const pelis = await this.readFile();
    const peliExistente = pelis.find((p) => p.id === peli.id);

    if (peliExistente) {
      return false;
    }

    pelis.push(peli);
    await this.writeFile(pelis);
    return true;
  }

  async getAll(): Promise<Peli[]> {
    return this.readFile();
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.readFile();
    return pelis.find((p) => p.id === id);
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.readFile();
    return pelis.filter((p) => {
      let esteVa = true;
      if (options.tag && !p.tags.includes(options.tag)) {
        esteVa = false;
      }
      if (options.title && !p.title.includes(options.title)) {
        esteVa = false;
      }
      return esteVa;
    });
  }
}

(async () => {
  const pelisCollection = new PelisCollection();

  // Agregar una película nueva
  const nuevaPeli = new Peli(1, "Nueva Película", ["tag1", "tag2"]);
  const agregada = await pelisCollection.add(nuevaPeli);

  if (agregada) {
    console.log("Película agregada con éxito");
  } else {
    console.log("La película ya existe");
  }

  // Obtener todas las películas y mostrar los títulos
  const peliculas = await pelisCollection.getAll();
  peliculas.forEach((pelicula) => {
    console.log(pelicula.title); // Asegúrate de que la propiedad 'title' esté escrita correctamente
  });

  // Obtener una película por su ID y mostrar su título si se encuentra
  const idBuscado = 1;
  const peliculaPorId = await pelisCollection.getById(idBuscado);
  if (peliculaPorId) {
    console.log("Película encontrada:", peliculaPorId.title); // Asegúrate de que 'peliculaPorId' no sea undefined
  } else {
    console.log("Película no encontrada");
  }

  // Buscar películas por título o etiqueta y mostrar sus títulos
  const opcionesBusqueda: SearchOptions = { title: "Nueva", tag: "tag1" };
  const peliculasEncontradas = await pelisCollection.search(opcionesBusqueda);
  console.log("Películas encontradas:");
  peliculasEncontradas.forEach((pelicula) => {
    console.log(pelicula.title); // Asegúrate de que la propiedad 'title' esté escrita correctamente
  });
})();

export { PelisCollection, SearchOptions, Peli }