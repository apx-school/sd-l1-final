import * as jsonfile from "jsonfile";
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  data: Peli[] = [];

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((datos) => {
      return (this.data = datos);
    });
  }
  getById(id: number): Promise<Peli> {
    const resultado = this.getAll().then((pelis) => {
      const resp = pelis.find((res) => {
        return res.id == id;
      });
      return resp;
    });

    return resultado;
  }
  search(options: any): Promise<any> {
    return this.getAll().then((datos) => {
      return datos.filter((res) => {
        var resultados;

        if (options.title && options.tag) {
          resultados =
            res.title.includes(options.title) && res.tags.includes(options.tag);
        } else if (options.title) {
          resultados = res.title.includes(options.title);
        } else if (options.tag) {
          resultados = res.tags.includes(options.tag);
        }
        return resultados;
      });
    });
  }
  add(peli: Peli): Promise<boolean> {
    const primerRespuesta = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        this.data.push(peli);
        const segundaRespuesta = jsonfile.writeFile("./pelis.json", this.data);
        return segundaRespuesta.then(() => {
          return true;
        });
      }
    });

    return primerRespuesta;
  }
}
export { PelisCollection, Peli };
