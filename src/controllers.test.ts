import anyTest, { TestFn } from "ava";
import { PelisController } from "./controllers";
import { getRandomId } from "./models.test";

const TEST_ID = getRandomId();
const SOME_TITLE = "una peli " + TEST_ID;
const SOME_TAG = "tag " + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const test = anyTest as TestFn<{
  con: PelisController;
}>;

// # IMPORTANTE #
// apenas te clones este repo
// todos los test a continuación van a fallar

// comentalos y descomentá uno a uno a medida
// que vas avanzando en cada test

test.serial(
  "Testeo PelisController get id (creado desde la terminal)",
  async (t) => {
    const controller = new PelisController();
    
    // Asegúrate de agregar la película antes de buscarla
    await controller.add({
      id: 1,
      title: "peli de la terminal 1", // Cambié el título para que coincida con la prueba
      tags: ["test"],
    });

    const peli = await controller.getOne({ id: 1 });
    t.is(peli.title, "peli de la terminal 1"); // Verifica el título correcto
  }
);

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["acción", SOME_TAG],
  });
  const peli = await controller.getOne({ id: TEST_ID });
  t.is(peli.title, SOME_TITLE);
});

test.serial("Testeo PelisController search title", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["acción", SOME_TAG],
  });

  const pelis = await controller.get({ search: { title: TEST_ID.toString() } });
  t.is(pelis.length, 1);
  t.is(pelis[0].id, TEST_ID);
});

test.serial("Testeo PelisController search tag", async (t) => {
  const controller = new PelisController();
  
  // Asegúrate de agregar la película con el tag correcto
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG], // Asegúrate de que este tag coincida con lo que buscas
  });

  await controller.add({
    id: SECOND_TEST_ID,
    title: "otra peli un poco más divertida",
    tags: [SOME_TAG], // Este tag también debe coincidir
  });

  const pelis = await controller.get({
    search: { title: "peli", tag: SOME_TAG }, // Asegúrate de que el tag coincida
  });
  
  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]); // Verifica que los IDs sean los correctos
});
