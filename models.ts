import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    peliculas: Peli[];

    getAll(): Promise<Peli[]> {
        const todasLasPelis = jsonfile
            .readFile("./pelis.json")
            .then((pelis) => {
                return (this.peliculas = pelis);
            });
        return todasLasPelis;
    }

    getById(id: number) {
        const buscarPorId = this.getAll().then((pelis) => {
            return pelis.find((item) => {
                return item.id == id;
            });
        });
        return buscarPorId;
    }
    search(options: any) {
        const search = this.getAll().then((pelis) => {
            return pelis.filter((item) => {
                if (options.title) {
                    return item.title
                        .toLocaleLowerCase()
                        .includes(options.title);
                }
                if (options.tags) {
                    return item.tags.includes(options.tags);
                }
            });
        });
        return search;
    }

    add(peli: Peli) {
        const promesaUno = this.getById(peli.id).then((peliExistente) => {
            if (peliExistente) {
                return false;
            } else {
                this.peliculas.push(peli);
                const data = this.peliculas;
                const promesaDos = jsonfile.writeFile("./pelis.json", data);

                return promesaDos.then(() => {
                    return true;
                });
            }
        });
        return promesaUno;
    }
}
export { PelisCollection, Peli };
