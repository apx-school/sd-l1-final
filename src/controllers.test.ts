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

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  const peli: any = await controller.getOne({ id: TEST_ID });
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
