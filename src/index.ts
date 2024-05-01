import minimist from "minimist";
import { PelisController } from "./controllers";

type TerminalParams = {
  action: string;
  id: number;
  title: string;
  tags?: string[];
  tag?: string;
};

function parseaParams(argv) {
  const result = minimist(argv);
  let newObj: TerminalParams = {
    action: null,
    id: null,
    title: "",
    tags: [],
    tag: "",
  };
  for (let prop in result) {
    if (result[prop][0] === "add") {
      newObj.action = "add";
    }
    if (result[prop][0] === "search") {
      newObj.action = "search";
    }
    if (result[prop][0] === "get") {
      console.log(result[prop][1]);
      newObj.action = "get";
      newObj.id = result[prop][1];
    }

    if (prop === "id") {
      newObj[prop] = result[prop];
    }
    if (prop === "title") {
      newObj[prop] = result[prop];
    }
    if (prop === "tag") {
      newObj[prop] = result[prop];
    }
    if (prop === "tags") {
      newObj[prop] = result[prop];
    }
  }
  return newObj;
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  const result = controller.processOptions(params);
  controller.promise.then(() => {
    if (result === undefined) {
      return controller.currentPeliColl;
    } else {
      result.then(() => {});
    }
  });
}

main();
