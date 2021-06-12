import * as minimist from "minimist";
import {PelisController} from "./controllers";

function parseaParams(argv) {
    const resultado = minimist(argv);
    return resultado
}

function indicador (params){
    const controller = new PelisController();

    if(params._[0]== "get"){
        return controller.get({id:params._[1]}).then((i)=> {return i});
    }else if(params._[0]== "search"){
        if(params.tag && params.title){
            return controller.get({search: {title:params.title, tag:params.tag}}).then((i)=>{return i})
        }else if(params.title){
            return controller.get({search:{title:params.title}}).then((i)=>{return i});
        }else if(params.tag){
            return controller.get({search:{tag:params.tag}}).then((i)=>{return i});
        }
    }else if(params._ == "add"){
        var nuevaPeli = {
            id:params.id,
            title:params.title,
            tags:params.tags
        }
        return controller.add(nuevaPeli)
    }else{
        return controller.get({}).then((i)=>{return i});
    }


}

function main(){
const params = parseaParams(process.argv.slice(2));
const resultado = indicador(params).then((resultado)=>{console.log(resultado)})
}
main()