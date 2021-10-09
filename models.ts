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
      var resultadoOptions;
      if (options.title) {
        var resultadoTitle = resp.find((peli) => {
          return peli.title.includes(options.title);
        });
        resultadoOptions = resultadoTitle;
      }
      if (options.tag) {
        var resultadoTag = resp.filter((peli) => {
          return peli.tags.includes(options.tag);
        });
        resultadoOptions = resultadoTag;
      }
      return resultadoOptions;
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = this.dataPelis.concat(peli);
        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          return true;
        });
      }
    });
    return promesaUno;
  }
}

export { PelisCollection, Peli };

function main() {
  const dataMock = new PelisCollection();
  const promesaMock = dataMock
    .add({
      id: 4,
      title: "Terminator 2",
      tags: ["ciencia ficción", "acción", "nacional"],
    })
    .then((resp) => {
      console.log(resp);
    });
  // console.log(promesaMock);
}
main();
