import * as jsonfile from "jsonfile";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];
  getAll(): any {
    return jsonfile.readFile("./pelis.json").then((pelis) => {
      return (this.data = pelis);
    });
  }

  getById(id: number) {
    return this.getAll().then((pelis) => {
      const resultado = pelis.find((p) => {
        return p.id == id;
      });
      return resultado;
    });
  }

  search(options: any): Promise<any> {
    return this.getAll().then((pelis) => {
      if (options.title && options.tag) {
        return pelis.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        });
      } else if (options.title) {
        return pelis.filter((p) => {
          return p.title.includes(options.title);
        });
      } else if (options.tag) {
        return pelis.filter((p) => {
          return p.tags.includes(options.tag);
        });
      }
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("No se puede agregar peli con id repetido")
        return false;
      } else {
        var data = jsonfile.readFileSync("./pelis.json");
        data.push(peli);

        const promesaDos = jsonfile.writeFile("./pelis.json", data);
        return promesaDos.then(() => {
          console.log("Peli agregada OK")
          return true;
        });
      }
    });

    return promesaUno;
  }
}

export { PelisCollection, Peli };
