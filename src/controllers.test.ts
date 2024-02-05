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
    // testeo peli agregada desde el script test del package
    const controller = new PelisController();
    const peli = await controller.get({ id: 4321865 });
    t.is(peli.title, "peli de la terminal 4321865");
  }
);

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  const peli = await controller.get({ id: TEST_ID });
  t.is(peli.title, SOME_TITLE);
});

test.serial("Testeo PelisController search title", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });

  const pelis = await controller.get({ search: { title: TEST_ID.toString() } });
  t.is(pelis.length, 1);
  t.is(pelis[0].id, TEST_ID);
});

test.serial("Testeo PelisController search tag", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: SECOND_TEST_ID,
    title: "otra peli un poco más divertida",
    tags: [SOME_TAG],
  });
  const pelis = await controller.get({
    search: { title: "peli", tag: SOME_TAG },
  });
  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});
