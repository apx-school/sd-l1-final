import minimist from "minimist";
import { PelisCollection, Peli, SearchOptions } from "./models";
import { PelisController, Options } from "./controllers";
    
function parsearTerminal() {
    const resultado: any = minimist(process.argv.slice(2));
    return resultado }

async function main () {
    let comandos: any = parsearTerminal();
    let controller: PelisController = new PelisController();
    let colecction: PelisCollection = new PelisCollection();

    if (comandos._ == 'add') {
        let peli: Peli = {
            id: comandos.id,
            title: comandos.title,
            tags: [comandos.tags[0], comandos.tags[1]] 
        };
        controller.add(peli) }

    else if (comandos._ == "get") {
        let resultado: Peli = await controller.get( comandos._[1] );
        return resultado }

    else if (comandos._ == "search" && comandos.title && !comandos.tag) {
        let opciones: SearchOptions = {
            title: comandos.title };
        let resultado: boolean | Peli[] = await colecction.search(opciones);
        return resultado }

    else if (comandos._ == "search" && comandos.tag  && !comandos.tag) {
        let opciones: SearchOptions = {
            tag: comandos.tag };
        let resultado: boolean | Peli[] = await colecction.search(opciones);
        return resultado }
    
    else if (comandos._ == "search" && comandos.title  && comandos.tag) {
        let opciones: Options = {
            search: {
                title: comandos.title,
                tag: comandos.tag } };
        let resultado = await controller.get(opciones);
        console.log(resultado) }

    else {
        let resultado = await colecction.getAll();
        return resultado }
};

main()

