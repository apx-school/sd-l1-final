import { PelisCollection, Peli } from "./models";

class PelisController {
    coleccion: PelisCollection;

    // Método constructor
    constructor() {
        this.coleccion = new PelisCollection();
    }

    // Método para obtener películas, usando los métodos del modelo
    get(options: any): Promise<any> {
        // Si el objeto options tiene un id
        if (options.id) {
            return this.coleccion.getById(options.id);
        }

        // Si el objeto tiene la propiedad search
        else if (options.search) {
            return this.coleccion.search(options.search);
        }

        // Si no se ingresa ningún parametro...
        else {
            return this.coleccion.getAll();
        }
    }

    // Método para agregar una peli al archivo, usando los métodos del modelo
    add(peli: Peli) {
        return this.coleccion.add(peli);
    }
}

export { PelisController };
