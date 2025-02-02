import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta
import { find, includes } from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
    year: number;
}

// se define el tipo de SeachOptions para el metodo search
export type SearchOptions = { title?: string; tag?: string };

// esta funcion se usa para normalizar titulos y tags
//prettier-ignore
function normalizeString(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// esta funcion usa normalizeString para normalizar las opciones de entrada
function normalizeOpts(options: SearchOptions) {
    let newOpts = options;
    if (options.tag) {
        newOpts.tag = normalizeString(newOpts.tag);
    }
    if (options.title) {
        newOpts.title = normalizeString(newOpts.title);
    }

    return newOpts;
}

// se trabaja directamente desde el pelis.json
class PelisCollection {
    // toma los datos desde pelis.json y los devuelve
    async getAll(): Promise<Peli[]> {
        try {
            const movies = await jsonfile.readFile(__dirname + "/pelis.json");
            return movies;
        } catch (err) {
            console.log("Error leyendo pelis.json", err);
            return [];
        }
    }

    // toma los datos desde pelis.json con getAll(), itera sobre al array y devuelve la coincidencia
    async getById(id: number): Promise<Peli | null> {
        const data = await this.getAll();
        if (!data) {
            return null;
        }
        const movie = find(data, (movie) => movie.id === id);
        if (!movie) {
            return null;
        }
        return movie;
    }

    // agrega una pelicula nueva a pelis.json
    // devuelve true/false si se agrega una peli/el id de la peli pasada como argumento ya existe
    async add(newPeli: Peli): Promise<boolean> {
        // obtenemos los datos
        const data = await jsonfile.readFile(__dirname + "/pelis.json");

        //comprobacion de id
        const peliExistente = find(data, (peli) => peli.id === newPeli.id);
        if (peliExistente) {
            return false;
        }

        data.push(newPeli);

        //se escriben los nuevos datos en pelis.json
        await jsonfile.writeFile(__dirname + "/pelis.json", data);
        return true;
    }

    async search(options: SearchOptions): Promise<Peli[]> {
        try {
            const data = await jsonfile.readFile(__dirname + "/pelis.json");

            const filteredList = data.filter((p: Peli) => {
                // primero normalizamos titulo, tags y las opciones de entrada
                const movieTags = p.tags.map((tag) => normalizeString(tag));
                const movieTitle = normalizeString(p.title);
                const newOpts = normalizeOpts(options);

                // luego comparamos
                // lo más importante es si se pasa una propiedad o dos, primero se evalua eso en cada if
                // se cambia coinc en base a la expresion 'includes' => boolean
                let coinc = false;
                if (options.tag && !options.title) {
                    coinc = includes(movieTags, newOpts.tag);
                } else if (options.title && !options.tag) {
                    coinc = includes(movieTitle, newOpts.title);
                } else {
                    coinc = includes(movieTags, newOpts.tag) && includes(movieTitle, newOpts.title);
                }
                return coinc;
            });
            return filteredList;
        } catch (err) {
            return null;
        }
    }
}

export { PelisCollection, Peli };
