import * as jsonfile from "jsonfile";
// sumo este import solo para que tsc lo tome y lo copie
// en la app no usamos esto para acceder al archivo porque es dinámico
import "/home/agustin/Documentos/APX/sd-l1-final/src/pelis.json";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = {
  title?: string;
  tag?: string;
};

class PelisCollection {
  datoss: [] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((data: any[]) => {
      const pelis: Peli[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        tags: item.tags,
      }));
      // Retorna el array de películas

      return pelis;
    });
  }

  getById(id: number): Promise<Peli> {
    return this.getAll().then((data: Peli[]) => {
      return data.find((item: Peli) => {
        return item.id == id;
      });
    });
  }
  add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        console.log("La pelicula ya existe");
        return false;
      } else {
        return this.getAll().then((data: Peli[]) => {
          data.push(peli); // Agrega la nueva película al arreglo
          return jsonfile.writeFile("./pelis.json", data).then(() => {
            console.log("Película agregada con éxito.");
            return true;
          });
        });
      }
    });

    return promesaUno;
  }

  search(options: SearchOptions): Promise<Peli[]> {
    return this.getAll().then((data: Peli[]) => {
      if (options.title && options.tag == undefined) {
        // Filtrar por título
        console.log("title:", options.title, " tag:", options.tag);
        const res = data.filter((peli) => peli.title.includes(options.title));

        return res;
      } else if (options.tag && options.title == undefined) {
        // Filtrar por etiqueta
        console.log("title:", options.title, " tag:", options.tag);
        const res = data.filter((peli) => peli.tags.includes(options.tag));

        return res;
      } else if (options.title && options.tag) {
        console.log("title:", options.title, " tag:", options.tag);
        const res = data.filter((peli) => peli.title.includes(options.title));
        return res.filter((peli) => peli.tags.includes(options.tag));
      } else {
        // Si no se proporciona ni título ni etiqueta, devolver todas las películas
        console.log("title:", options.title, " tag:", options.tag);
        return data;
      }
    });
  }
}

export { PelisCollection, Peli };
