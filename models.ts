import { timeStamp } from 'console';
import * as jsonfile from 'jsonfile';

class Peli { 
    id: number;
    title: string;
    tags: string[]
}

class PelisCollection { 
    lista: Peli[] = [];

    async getAll(): Promise<Peli[]>{
        const lista = await jsonfile.readFile('./pelis.json').then((obj) => { return obj });
        return lista
    }

    async getById(id:number): Promise<Peli>{
        const pelicula = await this.getAll().then((obj) => { return obj.find((x) => x.id == id)});

        return pelicula
    }

    async add(peli:Peli): Promise<boolean>{
        const promesaUno = this.getById(peli.id).then(async (peliExiste) => {

            const listaPeliculas = await this.getAll();

            if(peliExiste){
                return false
            } else { 
                listaPeliculas.push(peli);
                await jsonfile.writeFile('./pelis.json', listaPeliculas);
                
                return true
            }
        })
        
        return promesaUno
    };

    async search(options:any): Promise<Peli[]>{
        const titulo = options.title;
        const tags = options.tags;

        const listaPeliculas = await this.getAll();

        const peliToReturn = listaPeliculas.filter((x) => {
            if(titulo && tags){
                return x.title.includes(titulo) && x.tags.includes(tags);
            } 
            else if(titulo){
                return x.title.includes(titulo);
            }
            else if(tags){
                return x.tags.includes(tags)
            }
        });

        return  peliToReturn
    };

};

export { PelisCollection, Peli };