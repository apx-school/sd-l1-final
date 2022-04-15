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
            if (options.title && options.tag) {
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
    add(peli: Peli): Promise<boolean> {
        const firstPromise = this.getById(peli.id).then((movie) => {
            if (movie) {
                return false;
            } else {
                const secondPromise = jsonfile
                    .readFile("./pelis.json")
                    .then((movieCollection) => {
                        movieCollection.push(peli);
                        return jsonfile.writeFile(
                            "./pelis.json",
                            movieCollection
                        );
                    });
                return secondPromise.then(() => {
                    return true;
                });
            }
        });
        return firstPromise;
    }
}
export { PelisCollection, Peli };
