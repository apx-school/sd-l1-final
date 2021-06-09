import * as minimist from "minimist";
import {PelisController} from "./controllers";
import {Peli} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);
  console.log(resultado);
  if (resultado._[0] == "get"){
    const objt = {get: {id: resultado._[1]}};
    return objt;
  }else if(resultado._[0] == "add"){
    if (resultado.tags && resultado.title){
      return {search:{title:resultado.title, tags:resultado.tags}};
    }else if (resultado.tag){
      return {search:{tags: resultado.tags}};
    }else if (resultado.title){
      return {search:{title: resultado.title}};
    }else return {};

  } else if (resultado._[0] == "search"){
    if (resultado.tags && resultado.title){
      return {search:{title: resultado.title, tags: resultado.tags}};
    }else if (resultado.tag){
      return {search:{tags: resultado.tags}};
    }else if (resultado.title){
      return {search:{title: resultado.title}};
    }
  }else return {};

  if (resultado.search){
    return this.get(resultado.search).then((r)=>{
      const s = r.filter((p)=>{
        return p.search.includes(resultado.search)
      });
      return s;
    });

  }
  if (resultado.get){
    return this.get(resultado.get).then((r)=>{
      const s = r.filter((p)=>{
        return p.get.includes(resultado.get)
      });
      return s;
    });

  }

}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const parsedController = new PelisController();
  



}

main();
