import * as jsonfile from "jsonfile";
import jsonPelis from "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

class Peli {
    id: number;
    title: string;
    tags: string[] } 

interface SearchOptions {
    title?: string,
    tag?: string }

class PelisCollection {
    peliculasPromesa: Promise <Peli[]>;
    constructor() {
        this.peliculasPromesa = jsonfile.readFile("./src/pelis.json") }

    async getAll(): Promise <Peli[]> {
        return this.peliculasPromesa.then( res => { return res } ) }

    async add(pelicula: Peli) {
        let peliculas = await this.peliculasPromesa;
        let array: Peli[] = peliculas.filter(peli => peli.id == pelicula.id);
        if (array.length == 0) {
            peliculas.push(pelicula);
            return jsonfile.writeFile("./src/pelis.json", peliculas).then( () => { return true } ) }
        else { return false } }

    async getById(id: number): Promise <any> {
        let peliculas = await this.peliculasPromesa;
        let array: Peli[] = peliculas.filter(peli => peli.id == id);
        if (array.length == 0) return false
        else return array[0] }
 
    async search(opcion: SearchOptions): Promise <any> {
        let peliculas = await this.peliculasPromesa;
        if (opcion.title) {
            let array: Peli[] = peliculas.filter( peli => peli.title.includes(opcion.title) );
            if (array.length == 0) return false 
            else return array }
        else if (opcion.tag) {
            let array: Peli[] = peliculas.filter( peli => peli.tags.includes(opcion.tag) );
            if (array.length == 0) return false 
            else return array }
    }
}

export { PelisCollection, Peli, SearchOptions };

async function name () {
    const collection = new PelisCollection();
    let resultado = await collection.search( {tag: 'classic'}); 
    console.log(resultado) }
    




