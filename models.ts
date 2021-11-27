import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile("...laRutaDelArchivo").then(() => {
      // la respuesta de la promesa
      return [];
    });
  }
}
export { PelisCollection, Peli };