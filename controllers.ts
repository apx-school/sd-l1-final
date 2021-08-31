import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from "node:constants";
import { PelisCollection, Peli } from "./models";

class PelisController {
  //Instanciá el modelo PelisCollection y guardalo en una propiedad interna del controller.
  peliculas: PelisCollection;

  constructor() {
    this.peliculas = new PelisCollection();
  }

  /*get(options) recibe un objeto y, según cuales sean sus propiedades, hay dos opciones:
si el objeto tiene la propiedad id (ej: { id:1234 }), debe devolver la película con ese id.

si el objeto tiene la propiedad search (que es un objeto) y:
  si el objeto search tiene la propiedad title, debe buscar las pelis que tengan ese string en el 
  título. (ej: { search:{ title:"ju" } })
  si el objeto search tiene la propiedad tag, debe buscar las pelis que tengan ese tag. 
  (ej: { search:{ tag:"action" } })
  puede recibir las dos opciones. (ej: { search:{ tag:"action", title:"x" } } busca pelis con el 
  tag action y que tengan la letra x en su title)
  
  si no recibe ningún parámetro, debe devolver todas las películas.*/

  get(options) {
    if (options.id) {
      return this.peliculas.getById(options.id);
    } else if (options.search) {
      return this.peliculas.search(options.search);
    } else {
      return this.peliculas.getAll();
    }
  }

  /*
  add(peli:Peli) recibe un objeto y crea una peli en base a él. 
  (Ej.: { id:4421, title:"Una peli", tags:["classic","action"] })
  */
  add(peli: Peli) {
    return this.peliculas.add(peli); //Este add() ya incluye el filtro de si existe o no
  }
}
export { PelisController };
