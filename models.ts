import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    datos: Peli[] = [];
    getAll(): Promise<Peli[]> {
        return jsonfile.readFile("./pelis.json").then((t) => t);
    }

    //Funciona
    getById(id: number): Promise<any> {
        return this.getAll().then((films) =>
            films.find((film) => film.id == id)
        );
    }

    //Funciona
    add(peli: Peli): Promise<boolean> {
        const promesaUno = this.getById(peli.id).then((peliExistente) => {
            if (peliExistente) {
                return false;
            } else {
                // magia que agrega la pelicula a un objeto data
                const promesaDos = this.getAll().then((films) => {
                    const data = films.concat(peli);
                    return jsonfile.writeFile("./pelis.json", data);
                });

                return promesaDos.then(() => {
                    return true;
                });
            }
        });

        return promesaUno;
    }

    //Funciona
    search(options: any): Promise<any> {
        const promise = this.getAll().then((films) => {
            if (
                options.hasOwnProperty("title") &&
                options.hasOwnProperty("tag")
            ) {
                return films.filter(
                    (film) =>
                        film.title.includes(options.title) &&
                        film.tags.includes(options.tag.toLowerCase())
                );
            }
            if (options.hasOwnProperty("title")) {
                return films.filter((film) =>
                    film.title.includes(options.title)
                );
            }
            if (options.hasOwnProperty("tag")) {
                return films.filter((film) => {
                    let tagIdentico = film.tags.includes(
                        options.tag.toLowerCase()
                    );
                    if (tagIdentico) {
                        return film;
                    }
                });
            }
        });
        return promise;
    }
}

export { PelisCollection, Peli };
