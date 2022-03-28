import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    const archivo = "./pelis.json";
    return jsonfile.readFile(archivo).then((respuesta) => {
      return respuesta;
    });
  }
  getById(id: number): Promise<Peli> {
    const respuesta = this.getAll().then((pelis) => {
      const resultado = pelis.find((peli) => {
        return peli.id == id;
      });
      return resultado;
    });
    return respuesta;
  }
  search(options: any): Promise<any> {
    if (options.title) {
      const PelisFiltradas = this.getAll().then((arrayDePelis) => {
        const filtro = arrayDePelis.filter((peli) => {
          const title = peli.title.toLowerCase();
          return title.includes(options.title);
        });
        return filtro;
      });
      return PelisFiltradas;
    }
    if (options.tags) {
      const PelisFiltradas = this.getAll().then((arrayDePelis) => {
        const filtro = arrayDePelis.filter((peli) => {
          const textoLowerCase = options.tags.toLowerCase();
          const tagsLowerCase = peli.tags.map((tag) => tag.toLocaleLowerCase());
          return tagsLowerCase.includes(textoLowerCase);
        });

        return filtro;
      });
      return PelisFiltradas;
    }
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        const data = this.getAll().then((pelis) => {
          const respuesta = pelis.concat(peli);
          return respuesta;
        });
        const promesaDos = data.then((resultado) => {
          jsonfile.writeFile("./pelis.json", resultado);
        });
        return true;
      }
    });

    return promesaUno;
  }
}
export { PelisCollection, Peli };

function main() {
  const nuevo = new PelisCollection();
  nuevo.getById(6).then((resultado) => {
    console.log(resultado);
  });
}

main();
