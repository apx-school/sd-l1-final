import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras

class Peli {

    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {

    peliculas: Peli[] = [];

    async getAll(): Promise<Peli[]> {

        return await jsonfile.readFile("./pelis.json");
    }

    async getById(id: number): Promise<Peli> {

        let peliculas = await this.getAll();

        return peliculas.find( (pelicula: Peli) => pelicula.id === id );
    };
    
    async search(options: any): Promise<any> {

        const PELICULAS = await this.getAll();

        if(options.title && options.tag) {

            const TITLES_FOUND = PELICULAS.filter( (e) => e.title.includes(options.title) );

            return TITLES_FOUND.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag ) == options.tag );

        } else if(options.title) {

            return PELICULAS.filter( (e: any) => e.title.includes(options.title) );

        } else if(options.tag) {

            return PELICULAS.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag ) == options.tag );
        }
    }

    async add(pelicula: any): Promise<boolean> {

        const ID_EXISTE = await this.getById(pelicula.id);
                
        if(ID_EXISTE) {
            
            return false;
            
        } else {
            
            const PELICULAS = await this.getAll();

            PELICULAS.push(pelicula);
            await jsonfile.writeFile("./pelis.json", PELICULAS);

            return true;
        }                
    }
}

export { PelisCollection, Peli };
