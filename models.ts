import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  dataPelis: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      // la respuesta de la promesa // habia un []
      return (this.dataPelis = peliculas);
    });
  }
}
export { PelisCollection, Peli };

function main() {
  const dataMock = new PelisCollection();
  const promesaMock = dataMock.getAll().then((resp) => {
    console.log(resp);
  });
  // console.log(promesaMock);
}
main();
