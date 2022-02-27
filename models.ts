import * as js from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    movies: Peli[]
    async getAll(): Promise<Peli[]> {
        const movies = await js.readFile("./pelis.json");
        return this.movies = movies
    }

    async getById(id: number): Promise<Peli> {
        const movies = await this.getAll();
        const result = movies.find((movies) => {
            return movies.id === id;
        });
        return result;
    }

    async search(options: any): Promise<Peli[]> {
        const movies = await this.getAll();

        if (options.title && options.tag) {
            const result = movies.filter((movies) => {
                return (
                    movies.tags.includes(options.tag) &&
                    movies.title.includes(options.title)
                  );
            });
            return result;
        } else if (options.tag) {
            const result = movies.filter((movies) => {
                return movies.tags.includes(options.tag);
            });
            return result;
        } else if (options.title) {
            const result = movies.filter((movies) => {
                return movies.title.includes(options.title);
            });
            return result;
        }
    }
    async add(movie: Peli): Promise<boolean> {
        const promiseOne = this.getById(movie.id).then(
            async (peliExistente) => {
                if (peliExistente) {
                    return false;
                } else {
                    const movies = await this.getAll();
                    movies.push(movie);
                    const promiseTwo = js.writeFile("./pelis.json", movies);

                    return promiseTwo.then(() => {
                        return true;
                    });
                }
            }
        );
        return promiseOne;
    }
}

export { PelisCollection, Peli };
