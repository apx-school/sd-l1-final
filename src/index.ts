import minimist from 'minimist';
import { PelisCollection, SearchOptions} from "./models";

function parseaParams(argv) {
  const resultado = minimist(argv);

  return resultado;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const modelo = new PelisCollection();
  //
  if (params._[0] === "add" && params.id) {
    var newItem = {
      id: params.id,
      title: params.title,
      tags: params.tags,
    };    
    modelo.add(newItem).then((d)=>console.log(d));    
  }
  else if(params._[0] === "get")
  {
    var getId = params._[1];
    if(getId)
    {
      modelo.getById(Number(getId)).then((d)=>{
        console.log(d);
      });
    }
  }
  else if(params._[0] === "search")
  {
    const args = process.argv.slice(2);
    let options: SearchOptions = {};
    var searchPromise = args.forEach((arg) => {
        if (arg.startsWith("--title=")) {
            options.title = arg.split("=")[1];
        } else if (arg.startsWith("--tag=")) {
            options.tag = arg.split("=")[1];
        }        
    });
    modelo.search(options).then((data)=>{
      console.log(data);
    });    
  }
}

main();
