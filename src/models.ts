// Importamos todas las funcionalidades del módulo "jsonfile".
// Este módulo nos permite leer y escribir archivos JSON fácilmente.
import * as jsonfile from "jsonfile";

// Importamos el archivo JSON directamente aunque no lo usemos aquí.
// Esto le indica a TypeScript que debe incluir el archivo "pelis.json"
// en la carpeta de distribución (dist) cuando compile el proyecto.
import "./pelis.json";

// Definimos una constante con la ruta del archivo de películas.
// Esta ruta se usará cada vez que queramos leer o escribir el archivo.
const FILE_PATH = "./pelis.json";

// Creamos la clase Peli que representa el modelo de una película.
// No se deben modificar estas propiedades, pero sí se pueden agregar más si se desea.
class Peli {
  id: number; // El identificador único de la película
  title: string; // El título de la película
  tags: string[]; // Un arreglo de etiquetas o categorías asociadas a la película
}

// Clase que representa una colección de películas
class PelisCollection {
  // Método que devuelve todas las películas almacenadas en el archivo
  async getAll(): Promise<Peli[]> {
    // Leemos el contenido del archivo JSON de forma asíncrona
    const data = await jsonfile.readFile(FILE_PATH);
    // Devolvemos el arreglo de películas leído desde el archivo
    return data;
  }

  // Método que busca una película por su ID
  async getById(id: number): Promise<Peli> {
    // Obtenemos todas las películas
    const pelis = await this.getAll();
    // Buscamos la película cuyo id coincida con el parámetro recibido
    return pelis.find((p) => p.id === id);
  }

  // Método que permite buscar películas por título o por etiqueta
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    // Primero obtenemos todas las películas
    let pelis = await this.getAll();

    // Si el usuario pasó un título como filtro
    if (options.title) {
      // Filtramos las películas cuyo título incluya ese texto (ignorando mayúsculas)
      pelis = pelis.filter((p) =>
        p.title.toLowerCase().includes(options.title.toLowerCase())
      );
    }

    // Si el usuario pasó una etiqueta como filtro
    if (options.tag) {
      // Filtramos las películas que contengan esa etiqueta en su lista de tags
      pelis = pelis.filter((p) => p.tags.includes(options.tag));
    }

    // Devolvemos el resultado filtrado (puede ser todo, una parte o nada)
    return pelis;
  }

  // Método para agregar una nueva película al archivo
  async add(peli: Peli): Promise<boolean> {
    // Leemos todas las películas existentes
    const pelis = await this.getAll();
    // Verificamos si ya existe una película con ese mismo ID
    const existe = pelis.find((p) => p.id === peli.id);

    // Si ya existe, no se puede agregar y devolvemos false
    if (existe) {
      return false;
    }

    // Si no existe, la agregamos al arreglo
    pelis.push(peli);
    // Escribimos el nuevo arreglo en el archivo, formateado con espacios para que se vea bien
    await jsonfile.writeFile(FILE_PATH, pelis, { spaces: 2 });
    // Devolvemos true indicando que la película se agregó correctamente
    return true;
  }
}

// Exportamos las clases para que puedan ser usadas desde otros archivos del proyecto
export { PelisCollection, Peli };
