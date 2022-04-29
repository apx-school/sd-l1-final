import * as jsonfile from "jsonfile";

// no modificar estas propiedades, agregar todas las que quieras

class Peli {

    id: number;
    title: string;
    tags: string[];
}

class PelisCollection {

    peliculas: Peli[] = [];
    
    loadData = (): Promise<any> => jsonfile.readFile("./pelis.json").then( (response) => this.peliculas = response );
    getAll = () => this.peliculas;
    getById = (id: number) => this.peliculas.find( (e) => e.id == id );
    
    search = (options: any) => {

        if(options.title && options.tag) {

            const TITLES_FOUND = this.peliculas.filter( (e) => e.title.toLowerCase().includes(options.title.toLowerCase()) );

            return TITLES_FOUND.filter( (e) => e.tags.find( tag => tag == options.tag.toLowerCase() ) == options.tag.toLowerCase() );

        } else if(options.title) {

            return this.peliculas.filter( (e) => e.title.toLowerCase().includes(options.title.toLowerCase()) );

        } else if(options.tag) {

            return this.peliculas.filter( (e) => e.tags.find( tag => tag == options.tag.toLowerCase() ) == options.tag.toLowerCase() );
        }
    }

    add(data: any): boolean {   

        //RECIBE UNA PELI Y LA GUARDA EN EL JSON
        //DEVUELVE BOOLEAN QUE INDICA SI SE AGREGÓ O NO LA PELI
        //NO ADMITE IDS REPETIDOS

        const DATA = this.peliculas;

        const HAY_DATA = DATA.find( (e) => e.id == data.add.id );

        if(HAY_DATA) {

            return false

        } else {

            DATA.push(data.add);
            jsonfile.writeFile("./pelis.json", DATA);

            return true;
        }                
    }
}

export { PelisCollection };
