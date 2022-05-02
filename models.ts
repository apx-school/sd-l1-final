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

        return await jsonfile.readFile("./pelis.json")
    }

    async getById(id: number): Promise<any> {

        let peliculas = await this.getAll();

        return peliculas.find( (pelicula: Peli) => pelicula.id == id );
    };
    
    async search(options: any): Promise<any> {

        let peliculas = await this.getAll();

        if(options.title && options.tag) {

            const TITLES_FOUND = peliculas.filter( (e) => e.title.toLowerCase().includes(options.title.toLowerCase()) );

            return TITLES_FOUND.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag.toLowerCase() ) == options.tag.toLowerCase() );

        } else if(options.title) {

            return peliculas.filter( (e: any) => e.title.toLowerCase().includes(options.title.toLowerCase()) );

        } else if(options.tag) {

            return peliculas.filter( (e: any) => e.tags.find( (tag: any) => tag == options.tag.toLowerCase() ) == options.tag.toLowerCase() );
        }
    }

    async add(data: any): Promise<boolean> {

        const PELICULAS = await this.getAll();
        const ID_EXISTE = await this.getById(data.add.id);

        if(ID_EXISTE) {

            return false

        } else {

            PELICULAS.push(data.add);
            await jsonfile.writeFile("./pelis.json", PELICULAS);

            return true;
        }                
    }
}

export { PelisCollection, Peli };
