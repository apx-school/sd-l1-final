import * as jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
type SearchOptions = {
  title?: string;   
  tag?: string; 
}
const DB = path.resolve(__dirname, "pelis.json");
class PelisCollection {
  getAll(): Promise<Peli[]> {
    // Leemos el archivo pelis.json y devolvemos una promesa
    return (
      jsonfile
        .readFile(DB)
        //Retornamos el contenido del archivo como un array de Pelis
        .then((data) => data as Peli[])
        .catch((err) => {
          console.error("Error reading file:", err);
          return [];
        })
    );
  }
  getById(id: number): Promise<Peli | null> {
    // Obtenemos todas las pelis y buscamos la que tenga el id que nos pasan
    // Si no la encontramos devolvemos null
    return this.getAll()
      .then((pelis) => {
        // Buscamos la peli por id
        const peli = pelis.find((p) => p.id === id);
        // Si no la encontramos devolvemos null
        return peli || null;
      })
      .catch((err) => {
        console.error("Error getting peli by id:", err);
        return null;
      });
  }
  add(peli:Peli): Promise<boolean>{
    return this.getAll()
      .then((p) => {
        // Verificamos la existencia de la peli por id
        // Si ya existe, devolvemos false y no la agregamos
        const exist = p.some((e) => e.id === peli.id);
        if (exist) {
          console.error("Peli with this id already exists");
          return false;
        }
        // Agregamos la nueva peli y guardamos el archivo
        p.push(peli);
        return jsonfile.writeFile(DB, p).then(() => true);
      })
      .catch((err) => {
        console.error("Error adding peli:", err);
        return false;
      });
  }
  search(options:SearchOptions): Promise<Peli[]> {
    // Obtenemos todas las pelis y filtramos por las opciones que nos pasan
    return this.getAll()
      .then((pelis) => {
        return pelis.filter((p) => {
          // Verificamos si el título contiene la cadena de búsqueda
          const titleMatch = options.title ? p.title.includes(options.title.toLocaleLowerCase()) : true;
          // Verificamos si el tag está en los tags de la peli
          const tagMatch = options.tag ? p.tags.includes(options.tag.toLocaleLowerCase()) : true;
          return titleMatch && tagMatch;
        });
      })
      .catch((err) => {
        console.error("Error searching pelis:", err);
        return [];
      });
  }
}
export { PelisCollection, Peli };
