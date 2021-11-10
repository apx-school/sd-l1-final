import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile('./pelis.json').then((collection) => {
      this.data = collection;
      return collection;
    });
  }

  getById(id: number) {
    return this.getAll().then((collection) => {
      var peliBuscada = collection.find((peli) => peli.id == id);
      return peliBuscada;
    });
  }
}

const peliculas = new PelisCollection();
peliculas.getById(2).then((e) => {
  console.log(e);
});
console.log('a');
export { PelisCollection, Peli };
