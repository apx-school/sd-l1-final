import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    peliculas: Peli[]


    async getAll(): Promise<any> {
        const json = await jsonfile.readFile("./pelis.json").then((resp) => {
            return resp;
        });
        this.peliculas = json;
        return this.peliculas;
    }

    async getById(id: number): Promise<Peli> {
        return await this.getAll().then((x) => {
            return x.find((peli) => {
                return peli.id == id;
            });
        });
    }

    async search(options: any) {
        const peliculas = await this.getAll()

        if (options.title && options.tag) {
            return peliculas.filter((P) => {
                return P.title.includes(options.title) && P.tags.includes(options.tag)
            })
        } else if (options.title) {
            return peliculas.filter((P) =>
                P.title.includes(options.title)
            )
        } else if (options.tag) {
            return peliculas.filter((P) =>
                P.tags.includes(options.tag)
            )
        }
    }

    async add(peli: Peli): Promise<boolean> {
        const promesaUno = this.getById(peli.id).then((peliExistente) => {
            if (peliExistente) {
                return false;
            } else {
                return this.getAll().then((peliculas) => {
                    peliculas.push(peli);
                    const promesaDos = jsonfile.writeFile(
                        "./pelis.json",
                        peliculas
                    );
                    return promesaDos.then(() => {
                        return true;
                    });
                });
            }
        });
        return promesaUno;
    }



}


export { PelisCollection, Peli };