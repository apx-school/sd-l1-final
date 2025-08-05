import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras

class Peli { // Creamos la clase Peli que nos permitira saber la forma del objeto
  id: number;
  title: string;
  director: string;
  year: number;
  tags: string[];
  duration_minutes: number;
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection { // Creamos la clase PelisCollection que nos mostrara la colleccion de peliculas
  async getAll(): Promise<Peli[]> { // Creamos el metodo getAll que nos dara todas las peliculas y retornara una promesa con un array de Peli. Este metodo es async
    return jsonfile.readFile("./pelis.json"); // Y retorna la lectura del json de manera asincrona. No es necesario usar await
  };

  async getById(id: number): Promise<Peli | undefined>{ // Creamos el metodo getById que recibe un parametro id de tipo number y retorna una promesa con una Peli
    const pelis = await this.getAll(); // Guardamos la espera de obtener todas las pelis 
    const findPeli = pelis.find(p => p.id === id); // Hacemos un find de pelis y lo guardamos en la variable findPeli

    // Si peliEncontrada no es un falsy, retorna el objeto encontrado. Caso contrario, retorna un mensaje como fallback
    return findPeli;
  }

  async add(peli: Peli): Promise<boolean> { // Creamos el metodo asincrono para agregar peliculas que recibe un parametro peli de tipo Peli y retorna una promesa de tipo boolean
    const findPeli = await this.getById(peli.id); // Esperamos a que la funcion busque el elemento por id

    if(findPeli){ // Si getById retorna un truthy
      return false; // Retorna false
    } else { // En caso contrario
      const data = { ...peli }; // Usamos el operador spread (...) para crear un nuevo objeto que copia todas las propiedades y valores del objeto peli.

      const pelis = await this.getAll(); // Obtenemos todo el array de peliculas y lo guardamos en una variable
      pelis.push(data); // Pusheamos la data al array de peliculas

      await jsonfile.writeFile("./pelis.json", pelis); // Esperamos que jsonfile haga el write en pelis.json de las pelis (ya hecho string)

      return true; // Retornamos true
    }
  }

  async search(options: SearchOptions): Promise<Peli[]>{ // Creamos el metodo asincrono que recibe unas opciones del tipo SearchOptions y retorna una promesa con un array de Peli
    const list = await this.getAll(); // Obtenemos toda la lista de pelis

    const filteredList = [...list].filter(peli => { // Creamos una variable filteredList para copiar el filtro de la lista
      let check = true; // Creamos una flag que valida cambia si se cumple con un filtro

      if(options.title){ // Si options.title tiene algun valor
        check = check && peli.title.toLowerCase().includes(options.title.toLowerCase()); // Le asignamos el valor de la validacion de includes con el options title como parametro en lowerCase a la flag con el valor de la flag
      }

      if(options.tag){ // En caso de que options.title sea falsy, validamos si options.tag tiene algun valor
        // Convertimos todas las tags a minúsculas y validamos si alguna de las tags incluye la tag buscada (también en minúsculas)
        check = check && peli.tags.some(tag => tag.toLowerCase() === options.tag.toLowerCase()); 
      }

      return check;
    });

    return filteredList
  }
}

export { PelisCollection, Peli };