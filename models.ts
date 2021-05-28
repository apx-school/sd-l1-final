import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    peliculas: Peli[];

    getAll(): Promise<any[]> {
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
        return this.getAll().then((pelis) => {
            let resultado = pelis;

            if (options.title && options.tag) {
                return resultado.filter(
                    (item) =>
                        item.title
                            .toLocaleLowerCase()
                            .includes(options.title) &&
                        item.tags.includes(options.tag)
                );
            } else if (options.title) {
                resultado = pelis.filter((item) =>
                    item.title.toLocaleLowerCase().includes(options.title)
                );
            } else if (options.tag) {
                resultado = pelis.filter((item) =>
                    item.tags.includes(options.tag)
                );
            }
            return resultado;
        });
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
