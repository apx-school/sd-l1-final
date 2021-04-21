import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    const promesa = jsonfile.readFile("./pelis.json");
    promesa.then((res: Peli[]) => {
      this.data = res;
    });
    return promesa;
  }
  getById(id: number) {
    const promesa = this.getAll();
    promesa.then((res) => {
      res.find((item) => {
        return item.id == id;
      });
      return promesa;
    });
  }
}
export { PelisCollection, Peli };
