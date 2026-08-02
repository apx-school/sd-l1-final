import { PelisController, Options} from "./controllers";
import minimist from "minimist";

function parseaParams(argv:any){
  const resultado = minimist(argv);

  return resultado; 
   
  
}

async function main() {
  const control = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  
  if(params._[0]== "add"){
    const resultado = await control.add({
  id: params.id,
  title: params.title,
  tags: params.tags
});

console.log(resultado);

  } else if(params._[0] == "get"){
     const result = await control.get({
  id: Number(params._[1])
});

console.log(result);
    


  } else if(params._[0] == "search"){
    const result=await control.get({search:{
      title:params.title,
      tag:params.tag
    }})
    console.log(result);
  }


  }


main();
