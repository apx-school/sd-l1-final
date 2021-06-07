import * as minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const result = minimist(argv);
  const ne = new PelisController();
  if(result._[0] == "search"){
    if(result.title || result.tag){
      var peli = {
        search:{
          title: result.title,
          tag:result.tag,
        },
      };
      return ne.get(peli).then((d)=>{
        return d
      });
    }
  }
  if(result._[0] == "add"){
    var peliAd = {
      id: result.id,
      title: result.title,
      tags: result.tags
    };
    return ne.add(peliAd).then((d)=>{
      return d;
    });
  }
  if(result._[0] == "get"){
    var peliGet ={
      id: result._[1],
    };
    return ne.get(peliGet).then((d)=>{
      return d;
    });
  }
  if(result._[0] == null){
    return ne.get(result).then((d)=>{
      return d;
    })
  }
  return result;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  params.then(()=>console.log(params)
  )
  
}

main();