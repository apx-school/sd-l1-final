import * as jsonfile from "jsonfile";


class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  readonly FILE_PATH = './pelis.json';

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.FILE_PATH)
      .then((pelis: Peli[]) => pelis)
      .catch((error) => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
  }

  getById(id: number): Promise<Peli | null> {
    return this.getAll().then((pelis: Peli[]) => {
      const pelicula = pelis.find(peli => peli.id === Number(id));
      return pelicula ? pelicula : null;
    });
  }

  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id)
      .then(peliExistente => {
        if (peliExistente) return false; // Si ya existe, devolver false
  
        return jsonfile.readFile(this.FILE_PATH)
          .catch(() => []) // Si no existe el archivo, devolver un array vacío
          .then((pelis: Peli[]) => {
            pelis.push(peli); // Agregar la nueva película
            return jsonfile.writeFile(this.FILE_PATH, pelis, { spaces: 2 })
              .then(() => true) // Si se escribió correctamente, devolver true
              .catch(() => false); // Si hubo un error al escribir, devolver false
          });
      })
      .catch(() => false); // Si hubo un error al buscar la película, devolver false
  }
  

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const lista = await this.getAll();
  
    // Filtrar la lista según los criterios proporcionados
    const resultado = lista.filter((peli) => {
      // Si se pasan ambos criterios, deben cumplirse ambos (AND lógico)
      if (options.title && options.tag) {
        return (
          peli.title.toLowerCase().includes(options.title.toLowerCase()) &&
          peli.tags?.some((t) => t.toLowerCase() === options.tag.toLowerCase())
        );
      }
  
      // Si solo se pasa el criterio de título
      if (options.title) {
        return peli.title.toLowerCase().includes(options.title.toLowerCase());
      }
  
      // Si solo se pasa el criterio de tag
      if (options.tag) {
        return peli.tags?.some((t) => t.toLowerCase() === options.tag.toLowerCase());
      }
  
      // Si no hay criterios, no incluir la película
      return false;
    });
  
    return resultado; // Retornar el array filtrado
  }
  
}

export { PelisCollection, Peli };

