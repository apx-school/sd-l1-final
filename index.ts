import * as minimist from "minimist";
import { PelisController } from "./controllers"

function parseaParams(argv) {
  const allParsedArgs = minimist(argv);
  const result = {method: "get", options: {}};

  if (allParsedArgs._.includes("get")) {
    result.method = "get";
    result.options = {id: allParsedArgs._[1]};
  } else if (allParsedArgs._.includes('search')) {
    result.method = "get";
    result.options = {search: {title: allParsedArgs.title, tag: allParsedArgs.tag}};
  } else if (allParsedArgs._.includes('add')) {
    result.method = "add";
    result.options = {id: allParsedArgs.id, title: allParsedArgs.title, tags: allParsedArgs.tags};
  }
  console.log(allParsedArgs);
  console.log(result);
  return result;
  
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController;
  controller[params.method](params.options).then((res) => {console.log(res)});
}

main();