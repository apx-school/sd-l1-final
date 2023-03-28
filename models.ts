import * as jsonfile from "jsonfile"

class Peli {
    id:number;
    title:string;
    tags:string[]
}
type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
    pelisData:Peli[] = []
    async getAll():Promise<Peli[]> {
        await jsonfile.readFile("./pelis.json")
            .then((pelis:Peli[]) => {
                this.pelisData = pelis
            })
            .catch((err) => {
                console.error("Error al cargar el archivo", err)
            })
    return this.pelisData
    }
    async add(peli:Peli):Promise<boolean> {
        try {
            const pelis = await this.getAll()
            const existe = pelis.some((item) => item.id === peli.id)
            if(existe) {
                console.warn("La película que intentas añadir ya existe");
                return false
            }
            this.pelisData.push(peli)
            await jsonfile.writeFile("./pelis.json", this.pelisData)
            console.warn("La película se añadió con éxito");
            return true
        } catch(err) {
            console.error("Error al añadir la película", err)
        }
    }
    getAllPelis():Peli[] {
        return this.pelisData
    }
    async getById(id:number):Promise<Peli> {
        const pelis = await this.getAll()
        const resultado = pelis.find(item => item.id === id)
        return resultado
    }
    async search(options:SearchOptions):Promise<Peli[]> {
        const pelis = await this.getAll()
        let resultado:Peli[];
        if(options.title && options.tag) {
            resultado = pelis.filter((item) => 
            item.title.toLowerCase().includes(options.title.toLowerCase()) &&
            item.tags.includes(options.tag)) 
        } else if(options.title) {
            resultado = pelis.filter(item => item.title.toLowerCase().includes(options.title.toLowerCase()))
        } else if(options.tag) {
            resultado = pelis.filter(item => item.tags.includes(options.tag))
        }
        return resultado
    }
}
export {Peli, PelisCollection, SearchOptions}
