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
                console.log("La peli no se agrego porque ya existe.");
                return false
            } else { 
                listaPeliculas.push(peli);
                console.log("La peli se agregó correctamente.")
                await jsonfile.writeFile('./pelis.json', listaPeliculas);
                
                return true
            }
        })
        
        return promesaUno
    };

    async search(options:any): Promise<Peli[]>{
        const titulo = options.title;
        const tag = options.tag;

        const listaPeliculas = await this.getAll();

        const peliToReturn = listaPeliculas.filter((x) => {
            if(titulo && tag){
                return x.title.includes(titulo) && x.tags.includes(tag);
            }
            else if(titulo){
                return x.title.includes(titulo);
            }
            else if(tag){
                return x.tags.includes(tag)
            }
            else{
                return false
            }
        });

        return  peliToReturn
    };

};

export { PelisCollection, Peli };