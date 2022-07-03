import * as minimist from "minimist";
import  {PelisController} from "./controllers"

function parseaParams(argv) {
  const commands = minimist(argv);

  const options = commands._[0];

  if (options == "get") {
    return {id : commands._[1]};

  } else if(options == "search"){

    if (commands.title && commands.tag) {
      return {search : {title: commands.title, tags: commands.tag}};

    } else if (commands.title) {
      return {search : {title: commands.title}};  

    } else if (commands.tag) {
      return  {search : {tags: commands.tag}}
    };

  } else if (options == "add"){
    return {add : {id: commands.id , title : commands.title, tags : commands.tags}};

  } else {
    
    return {all : 1}

  }
}

function main() {

  const params = parseaParams(process.argv.slice(2));

  const movies = new PelisController;
  movies.get(params).then((result)=>{
  console.log(result);
  });

}

main();
