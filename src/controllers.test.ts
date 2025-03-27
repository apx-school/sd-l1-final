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

// Asegurarnos que la película con el id 4321865 existe, si no, la agregamos.
const setupTerminalTestData = async (controller: PelisController) => {
  const terminalTestId = 4321865;
  const existingPeli = await controller.getOne({ id: terminalTestId });
  
  if (!existingPeli) {
    // Si no existe, la agregamos manualmente
    await controller.add({
      id: terminalTestId,
      title: `peli de la terminal ${terminalTestId}`,
      tags: ["terminal", "test"],
    });
  }
};

test.serial("Testeo PelisController get id (creado desde la terminal)", async (t) => {
  const controller = new PelisController();
  
  // Aseguramos que la peli con id 4321865 esté en la colección
  await setupTerminalTestData(controller);

  // Test de obtener una película existente
  const peli = await controller.getOne({ id: 4321865 });
  t.is(peli?.title, "peli de la terminal 4321865");
});

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  
  // Agregamos una película
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  
  // Obtenemos la película por su id
  const peli = await controller.getOne({ id: TEST_ID });
  t.is(peli?.title, SOME_TITLE);
});

test.serial("Testeo PelisController search title", async (t) => {
  const controller = new PelisController();
  
  // Agregamos una película
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });

  // Realizamos la búsqueda por título
  const pelis = await controller.get({
    search: { title: TEST_ID.toString() },
  });
  
  // Verificamos que solo haya una película que coincida
  t.is(pelis.length, 1);
  t.is(pelis[0].id, TEST_ID);
});

test.serial("Testeo PelisController search tag", async (t) => {
  const controller = new PelisController();
  
  // Agregamos dos películas
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  
  await controller.add({
    id: SECOND_TEST_ID,
    title: "otra peli un poco más divertida",
    tags: [SOME_TAG],
  });

  // Realizamos la búsqueda por título y tag
  const pelis = await controller.get({
    search: { title: "peli", tag: SOME_TAG },
  });
  
  // Verificamos que ambas películas sean devueltas
  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});



