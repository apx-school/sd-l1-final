import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    pelis: Peli[];
    getAll(): Promise<Peli[]> {
        return jsonfile.readFile("./pelis.json").then((pelis) => {
            return (this.pelis = pelis);
        });
    }
    getById(id: number): Promise<Peli> {
        return this.getAll().then(() => {
            return this.pelis.find((prod) => {
                return prod.id == id;
            });
        });
    }
    search(option: any) {
        return this.getAll().then(() => {
            if (option.title && option.tag) {
                var pelisPorTag = (pelisPorTag = this.pelis.filter(
                    (pelisPorTag) => {
                        return pelisPorTag.tags.includes(option.tag);
                    }
                ));
                var pelisPorDosOpciones = pelisPorTag.filter(
                    (pelisPorTitle) => {
                        return pelisPorTitle.title.includes(option.title);
                    }
                );
                return pelisPorDosOpciones;
            } else if (option.title) {
                return this.pelis.filter((pelis) => {
                    return pelis.title.includes(option.title);
                });
            } else if (option.tag) {
                return this.pelis.filter((pelis) => {
                    return pelis.tags.includes(option.tag);
                });
            }
        });
    }
    add(peli: Peli) {
        return this.getById(peli.id).then((peliEncontrada) => {
            if (peliEncontrada) {
                return false;
            } else {
                const added = this.pelis.push(peli);
                jsonfile.writeFile("./pelis.json", this.pelis);
                return true;
            }
        });
    }
}
// const d = new PelisCollection();
// d.getAll().then((res) => console.log(res));
export { PelisCollection, Peli };
