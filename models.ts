import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection extends Peli {
  getAll(): Promise<Peli[]> {
    return jsonfile("...laRutaDelArchivo").then(() => {
      // la respuesta de la promesa
      return [];
    });
  }
  getById(id: number) {}
  search(options: any) {}
  add(peli: Peli) {}
}
export { PelisCollection, Peli };
