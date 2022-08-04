import { PelisCollection, Peli } from "./models";

class PelisController {
  collection: PelisCollection;
  constructor() {
    this.collection = new PelisCollection();
  }
  async get(options): Promise<any> {
    //sol potr id
    if (options.id) {
      ///////////////////////////////////////////
      const res = await this.collection.getById(options.id);
      return res;
      ////////////////////////////////////////
    } else if (options.options[1]) {
      return await this.collection.getById(options.options[1]);
    }
    //si no existe options
    else if ((options = {})) {
      console.log("entro 5");
      return await this.collection.getAll();
    }
    //tags y titulo
    else if (options.search.tags && options.search.title) {
      console.log("entro 4");
      return (
        await this.collection.search({ tags: options.search.tags })
      ).filter((item) => {
        return item.title.includes(options.search.title);
      });
    }
    //solo tags tag
    else if (options.search.tags) {
      console.log("entro 3");
      return await this.collection.search({ tags: options.search.tags });
    }
    // solo titulo
    else if (options.search.title) {
      console.log("entro 2");
      return await this.collection.search({ title: options.search.title });
    }

    return await this.collection.getAll();
  }
  async add(peli: Peli) {
    return await this.collection.add(peli);
  }
}

///////////////////////pruebas////////////////////////////
/* 
const pruebas = new PelisController();
//pueba get por id
pruebas.get({ id: 1 }).then((res) => console.log(res));
//pruba de search por titulo
pruebas
  .get({ search: { title: "dos" } })
  .then((res) => console.log("SEARCH ::::::::::::::::::::::.", res));
//pruba de search por el tags
pruebas.get({ search: { tags: "miedo" } }).then((res) => {
  console.log("RES DEL GET TAGS");
});

pruebas.get({}).then((res) => {
  console.log("RES DEL GET TAGS y title ", res);
});
pruebas
.add({ id: 4421, title: "Una peli", tags: ["classic", "action"] })
.then((res) => {
  console.log(res);
});
async function prueba() {
  const controller = new PelisController();
  const agrego = await controller.add({
    id: 442111111,
    title: "Una peli agregada desde el controllers 2222222222222222222",
    tags: ["classic", "action"],
  });
  const peli = await controller.get({ id: 442111111 });
  console.log("LOG de agrego", agrego);
  
  console.log("LOG de peli", peli);
  console.log("LOG de peli.title", peli.title);
}
prueba();
*/

export { PelisController };
