import {
  PelisCollection,
  Peli,
} from "/home/agustin/Documentos/APX/sd-l1-final/src/models";
import "/home/agustin/Documentos/APX/sd-l1-final/src/pelis.json";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  mod = new PelisCollection();
  get(options?: Options) {
    if (options?.id !== undefined) {
      return this.mod.getById(options?.id);
    } else if (options?.search !== undefined) {
      return this.mod.search(options?.search);
    } else if (Object.keys(options).length === 0) {
      return this.mod.search({});
    }
  }

  add(peli: Peli) {
    this.mod.add(peli);
  }
}
export { PelisController };
/*
// Crear una instancia de PelisCollection (puedes utilizar tus propios datos o mocks)
//const pelisCollection = new PelisCollection();
const pelisCollection = new PelisCollection();
// Crear una instancia de PelisController pasando la instancia de PelisCollection como argumento

// Llamar al método get con diferentes opciones y manejar la promesa resultante
// Aquí hay algunos ejemplos:
const pelisController = new PelisController();
// Obtener una película por ID
pelisController
  .get({ id: 3, search: { title: "", tag: "" } })
  .then((result) => {
    console.log("Película encontrada por ID:", result);
  })
  .catch((error) => {
    console.error("Error al buscar película por ID:", error);
  });

// Buscar películas por título

pelisController
  .get({ search: { title: "Volver" } })
  .then((result) => {
    console.log("Películas encontradas por título:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por título:", error);
  });

// Buscar películas por tag

pelisController
  .get({ search: { tag: "terror" } })
  .then((result) => {
    console.log("Películas encontradas por tag:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por tag:", error);
  });


// Buscar películas por título y tag
const pelisController = new PelisController();
pelisController
  .get({ search: { title: "u", tag: "action" } })
  .then((result) => {
    console.log("Películas encontradas por título y tag:", result);
  })
  .catch((error) => {
    console.error("Error al buscar películas por título y tag:", error);
  });

// Obtener todas las películas
/*
pelisController
  .get({})
  .then((result) => {
    console.log("Todas las películas:", result);
  })
  .catch((error) => {
    console.error("Error al obtener todas las películas:", error);
  });*/
