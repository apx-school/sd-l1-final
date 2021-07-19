import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((json) => {
      // la respuesta de la promesa
      return json;
    });
  }
  getById(id: number): Promise<Peli> {
    return this.getAll().then((res) => {
      const respuesta = res.find((i) => {
        return i.id == id;
      });
      return respuesta;
    });
  }
  search(options: any): Promise<any> {
    return this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        return peliculas.filter((tt) => {
          return (
            tt.title.includes(options.title) && tt.tags.includes(options.tag)
          );
        });
      } else if (options.tags) {
        return peliculas.filter((ta) => {
          return ta.tags.includes(options.tags);
        });
      } else if (options.title) {
        return peliculas.filter((ti) => {
          return ti.title.includes(options.title);
        });
      }
    });
  }
  add(peli: Peli): Promise<Boolean> {
    const promesa1 = this.getById(peli.id).then((peliencontrada) => {
      // activo lapromesay ledigo si esta el id retorna falso
      if (peliencontrada) {
        return false;
      } else {
        // sino creo otra promesa activando getall() y le agrego la nueva peli retornando guardandola en el archivo
        const promesa2 = this.getAll().then((peliculas) => {
          peliculas.push(peli);
          return jsonfile.writeFile("./pelis.json", peliculas);
        });
        // luego digo cuando suceda esto retorname true
        return promesa2.then(() => {
          return true;
        });
      }
    });
    return promesa1;
    // retorname el resultado de todo
  }
}
export { PelisCollection, Peli };
// const prob = new PelisCollection();
// prob.search({ title: "si" }).then((a) => console.log(a));
// prob
//   .add({ id: 3, title: "probando", tags: ["accion"] })
//   .then((a) => console.log(a));
