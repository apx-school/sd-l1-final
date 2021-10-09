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
  getById(id: number) {
    return this.getAll().then((resp) => {
      const resultado = resp.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
  }
  search(options: any) {
    return this.getAll().then((resp) => {
      if (options.title) {
        var resultado = resp.find((peli) => {
          return peli.title.includes(options.title);
        });
      }
      return resultado;
    });
  }
}
export { PelisCollection, Peli };

function main() {
  const dataMock = new PelisCollection();
  const promesaMock = dataMock.search({ title: "X" }).then((resp) => {
    console.log(resp);
  });
  // console.log(promesaMock);
}
main();
