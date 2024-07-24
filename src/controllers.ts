import { PelisCollection, Peli } from "./models";

interface Options {
    id?: number;
    search?: {
        title?: string;
        tag?: string }
}

class PelisController {
    coleccion: PelisCollection;
    constructor() {
        this.coleccion = new PelisCollection() };
    
    async get(opciones?: Options): Promise <any> {
        try {   
            if (opciones.id) { 
            return this.coleccion.getById(opciones.id) }

            else if (opciones.search.title && !opciones.search.tag) {
                return this.coleccion.search( {title : opciones.search.title} ) }

            else if (opciones.search.tag && !opciones.search.title) {
                return this.coleccion.search( {tag : opciones.search.tag} ) }

            else if (opciones.search.title && opciones.search.tag) {
                let peliculas: Peli[] = await this.coleccion.getAll();
                let title: string = opciones.search.title;
                let tag: string = opciones.search.tag;
                let primerFiltro: Peli[] = peliculas.filter( peli => peli.title.includes(title) );
                let segundoFiltro: Peli[] = primerFiltro.filter( peli => peli.tags.includes(tag) );
                if (segundoFiltro.length == 0) return false
                return segundoFiltro }
        } 
        catch { return false } 
    }

    add (peli: Peli) { this.coleccion.add(peli) }
}

export { PelisController, Options };
/*
async function a () {
    let a: PelisController = new PelisController();
    let c: Options = {
        search: {
            title: "",
            tag: "" } 
    }
    let z: Peli = { 
        id: 4421, 
        title: "Una peli", 
        tags: ["classic", "action"] 
      };
    await a.add(z);

 
}
a();
*/


