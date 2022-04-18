import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
   const input = minimist(argv);
   const get = input._.find((e) => e == "get");
   const search = input._.find((e) => e == "search");
   const add = input._.find((e) => e == "add");

   if (get) {
      return { get: { id: input._[1] } };
   } else if (search) {
      return {
         search: {
            title: input.title,
            tags: input.tag,
         },
      };
   } else if (add) {
      return {
         add: {
            id: input.id,
            title: input.title,
            tags: input.tags,
         },
      };
   }
}
function processOptions(options) {
   const controller = new PelisController();
   if (options.get) {
      return controller.get(options.get);
   } else if (options.search) {
      return controller.get(options);
   } else if (options.add) {
      return controller.add(options.add);
   } else return controller.get({});
}

function main() {
   const params = parseaParams(process.argv.slice(2));
   processOptions(params).then((res) => {
      // console.log(res);
   });
}

main();
