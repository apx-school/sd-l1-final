import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    getAll(): Promise<any[]> {
        return jsonfile.readFile("./pelis.json").then((pelis) => {
            return pelis;
        });
    }
    getById(id: number) {
        return jsonfile.readFile("./pelis.json").then((pelis) => {
            return pelis.find((item) => item.id == id);
        });
    }
    search(options: any) {
        return jsonfile.readFile("./pelis.json").then((pelis) => {
            if (options.title && options.tags) {
                return pelis.filter(
                    (item) =>
                        item.title.includes(options.title) &&
                        item.tags.includes(options.tag)
                );
            } else if (options.title) {
                return pelis.filter((item) =>
                    item.title.includes(options.title)
                );
            } else {
                return pelis.filter((item) => item.tags.includes(options.tag));
            }
        });
    }
    add(peli: Peli) {
        const promise = this.getById(peli.id);
        promise.then((movieExist) => {
            if (movieExist) {
                return false;
            }else{
            return jsonfile.readFile("./pelis.json").then((collectionMovie) => {
                collectionMovie.push(peli);
                return jsonfile.writeFile("./pelis.json", collectionMovie).then(() => {
                    return true;
                });
            });
        }});
        return promise;
    }
}
export { PelisCollection, Peli };
