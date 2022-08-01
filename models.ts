import * as jsonfile from 'jsonfile';

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {
    readFile() {
        return jsonfile.readFile('./pelis.json');
    }
    getAll(): Promise<Peli[]> {
        const movies = this.readFile().then((peliculas) => {
            return peliculas;
        });
        return movies;
    }
    getById(id: number): Promise<Peli> {
        const movies = this.readFile().then((peliculas) => {
            //console.log(movies);
            const pelicula = peliculas.find((m) => {
                //console.log(m);
                return m.id == id;
            });
            return pelicula;
        });
        return movies;
    }
    search(option: any): Promise<any> {
        const movies = this.readFile().then((peliculas) => {
            /* console.log('movies', peliculas); */
            if (option.title && option.tag) {
                //console.log("entre en tag y title")
                const moviesPerTitle = peliculas.filter((m) => {
                    return m['title'].includes(option.title);
                });
                /* console.log(moviesPerTitle); */
                const retorno = moviesPerTitle.filter((m) => {
                    if (m['tags'].includes(option.tag)) {
                        return m;
                    }
                });
                /* console.log(retorno); */
                return retorno;
            }
            if (option.title) {
                //console.log('entre en title');
                return peliculas.filter((m) => {
                    return m['title'].includes(option.title);
                });
            }
            if (option.tag) {
                //console.log('entre en tag');
                return peliculas.filter((m) => {
                    if (m['tags'].includes(option.tag)) {
                        return m;
                    }
                });
            }
        });
        return movies;
    }
    add(peli: Peli): Promise<boolean> {
        const primeraPromesa = this.getById(peli.id).then((peliExistente) => {
            if (peliExistente) {
                return false;
            } else {
                return this.readFile().then((peliculas) => {
                    delete peli['_'];
                    peliculas.push(peli);
                    const promesaDos = jsonfile.writeFile(
                        './pelis.json',
                        peliculas
                    );
                    return promesaDos.then(() => {
                        return true;
                    });
                });
            }
        });
        return primeraPromesa;
    }
}
export { PelisCollection, Peli };
