import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    peliculas: Peli[] = [];

    // Método para obtener todas las pelis
    getAll(): Promise<Peli[]> {
        // Obtengo la información del pelis.json
        const pelisJson = jsonfile.readFile(__dirname + "/pelis.json");

        // Resuelvo la promesa para que devuelva todo el json
        pelisJson.then((peliculas: Peli[]) => {
            // Asigno todas las peliculas del archivo a la propiedad
            this.peliculas = peliculas;

            return peliculas;
        });

        return pelisJson;
    }

    // Método para obtener una película por ID
    getById(id: number): Promise<Peli> {
        // Primero, creo una promesa a partir de getAll
        const promesaPelis = this.getAll();

        // Resuelvo la promesa, para poder retornar lo que se busca que devuelva
        const resultado = promesaPelis.then((peliculas) => {
            const busqueda = peliculas.find((item: Peli) => item.id == id);

            return busqueda;
        });

        return resultado;
    }

    // Método para buscar por propiedades
    search(options: any): Promise<Peli[]> {
        // Primero, obtengo todas las películas con la promesa
        const promesaPelis = this.getAll();

        // Hago el proceso acá
        const promesaBusqueda = promesaPelis.then((pelis) => {
            // Variables auxiliares
            let resultado: Peli[];

            // Ahora, según las opciones que nos brinda el usuario hacemos la búsqueda
            if (options.title && options.tag) {
                resultado = pelis.filter(
                    (item: Peli) =>
                        item.title.includes(options.title) &&
                        item.tags.includes(options.tag)
                );
            }

            // En caso de que sólo haya título
            else if (options.title) {
                resultado = pelis.filter((item: Peli) =>
                    item.title.includes(options.title)
                );
            }

            // En caso de que sólo haya un tag
            else if (options.tag) {
                resultado = pelis.filter((item: Peli) =>
                    item.tags.includes(options.tag)
                );
            }

            return resultado;
        });

        return promesaBusqueda;
    }

    // Método para agregar una película al archivo pelis.json
    add(peli: Peli): Promise<boolean> {
        // Ahora, a través de una promesa, llevamos a cabo el proceso
        const promesaBusqueda = this.getById(peli.id).then((res) => {
            // Si el resultado NO es vacío, retorno false
            if (res) {
                return false;
            }

            // Si el ID NO existe, entonces se guarda , y se retorna true
            else {
                // Agrego la película
                this.peliculas.push(peli);

                // Guardo el array de peliculas en el archivo con una promesa
                const promesaGuardado = jsonfile.writeFile(
                    __dirname + "/pelis.json",
                    this.peliculas
                );

                return promesaGuardado.then(() => {
                    return true;
                });
            }
        });

        return promesaBusqueda;
    }
}

export { PelisCollection, Peli };
