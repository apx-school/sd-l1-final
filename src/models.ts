import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
import * as path from 'path';
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  pelis: Peli[] = [];
  


  async getAll(): Promise<Peli[]> {
    const rutaAbsoluta = path.resolve(__dirname, "./pelis.json");
    try {
      const pelis = await jsonfile.readFile(rutaAbsoluta);
      return pelis;
    } catch (error) {
      console.error('Error al leer pelis.json:', error);
      return [];
    }
  }


  async getById(id:number): Promise<Peli>{
    const pelis = await this.getAll();
    return pelis.find((peli)=> peli.id === id)
  }
  

  async add(peli: Peli): Promise<boolean> {
    // Primero verificamos si la película ya existe con el id proporcionado
    const PromesaUno = await this.getById(peli.id);
    if (PromesaUno) {
      return false; // Si ya existe, no agregamos
    } else {
      // Obtenemos la ruta absoluta del archivo pelis.json
      const peliExistentePath = path.resolve(__dirname, "pelis.json");
  
      try {
        // Leemos el archivo existente
        const peliExistente = await jsonfile.readFile(peliExistentePath);
  
        // Añadimos la nueva película a los datos existentes
        const data = [...peliExistente, peli];
  
        // Escribimos el archivo actualizado con los nuevos datos
        await jsonfile.writeFile(peliExistentePath, data);
        
        return true; // Si todo salió bien, retornamos true
      } catch (error) {
        console.error("Error al leer o escribir el archivo JSON:", error);
        return false; // Si hubo un error, retornamos false
      }
    }
  }



  async search(options) {
    const lista = await this.getAll();
    const listaFiltrada = lista.filter((peli) => {
      let coincide = true;
  
      // Verificamos si el título contiene el valor de options.title
      if (options.title && !peli.title.toLowerCase().includes(options.title.toLowerCase())) {
        coincide = false;
      }
  
      // Verificamos si el tag existe en los tags de la película
      if (options.tag && !peli.tags.some(tag => tag.toLowerCase() === options.tag.toLowerCase())) {
        coincide = false;
      }
  
      return coincide;
    });
  
    return listaFiltrada;
  }
  }
export { PelisCollection, Peli };


/*const grupo = new PelisCollection();
grupo.getAll().then((pelis)=>{
  console.log(pelis)
})
grupo.getById(3).then((peli) => {
  console.log(peli); // Debería imprimir la película con id 1
}).catch((error) => {
  console.error("Error:", error);
}); 


// Nueva película que quieres agregar
const nuevaPeli: Peli = {
  id: 9,
  title: "Peli 4",
  tags: ["action", "thriller"],
};

// Probar el método add
grupo.add(nuevaPeli).then((resultado) => {
  if (resultado) {
    console.log("Película agregada correctamente.");
    console.log(grupo.getAll())
  } else {
    console.log("La película ya existe.");
  }
}).catch((error) => {
  console.error("Error al agregar la película:", error);
});

grupo.search({ tag: "Accion" }).then((resultado) => {
  console.log("Resultados por tag 'accion':", resultado);
});

// Ejemplo de búsqueda por title
grupo.search({ title: "Drive" }).then((resultado) => {
  console.log("Resultados por title 'Drive':", resultado);
});*/



