import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import ("../distpelis.json");
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}
export type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  data: Peli[];
  getAll = async () => {

    try {
  
      const archivo = await jsonfile.readFile( "../distpelis.json");
  
      this.data = archivo;
  
      return this.data;
  
    } catch (error) {
  
      console.error("Error al leer el archivo:", error);
  
      // Inicializa el archivo si no existe
  
      await jsonfile.writeFile(("../distpelis.json"), []);
  
      this.data = []; // Asigna un arreglo vacío
  
      return this.data;
  
    }
  
  }
  getById = async (id: number): Promise<Peli | null> => {
    try {
      // Lógica para buscar la película por ID
    const peliculas = await this.getAll(); // Llamamos a getAll como una función
    const encontrado = peliculas.find((pelicula) => pelicula.id === id); // Usamos triple igual para comparación estricta
    return encontrado;

      } catch (error) {
    
        console.error("Error en getById:", error);
    
        throw new Error("No se pudo encontrar la película");
    
      }
}
async add(peli: Peli): Promise<Boolean> {
  const peliExistente = await this.getById(peli.id);
  if (peliExistente) {
    return false; // La película ya existe
  } else {
    try {
      const data: Peli[] = await jsonfile.readFile( "../distpelis.json");
      data.push(peli);
      await jsonfile.writeFile( "../distpelis.json", data);
      return true; // Se agregó la película
    } catch (error) {
      console.error("Error al leer o escribir el archivo:", error);
      return false; // O maneja el error de otra manera
    }
  }
}

async search(options: SearchOptions) {
  try {
    const lista = await this.getAll();
    return lista.filter(p => {
      const tieneTag = options.tag ? p.tags.includes(options.tag) : true;
      const tieneTitulo = options.title ? p.title.toLowerCase().includes(options.title.toLowerCase()) : true;
      return tieneTag && tieneTitulo;
    });
  } catch (error) {
    console.error("Error en search:", error);
    throw new Error("Error al buscar películas");
  }
}

}
// (async () => {
//   const prue1 =  new PelisCollection();
//   console.log(await prue1.getById(3))
// }) ();
export { PelisCollection, Peli };
