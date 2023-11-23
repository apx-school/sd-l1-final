import anyTest, { TestFn } from "ava";
import { PelisController } from "./controllers";
import { getRandomId } from "./models.test";

const TEST_ID = getRandomId();
const SOME_TITLE = "una peli " + TEST_ID;
const SOME_TAG = "tag " + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const test = anyTest as TestFn<{ con: PelisController }>;

test.serial("Testeo PelisController get id (creado desde la terminal)", async (t) => {
  const controller = new PelisController();
  const pelis = await controller.get({ id: 1 });
  t.true(pelis.length > 0);
  t.is(pelis[0].id, 1);
  t.is(pelis[0].title, "peli 1");
});

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({ id: TEST_ID, title: SOME_TITLE, tags: ["classic", SOME_TAG] });
  const pelis = await controller.get({ id: TEST_ID });
  t.true(pelis.length > 0);
  t.is(pelis[0].id, TEST_ID);
  t.is(pelis[0].title, SOME_TITLE);
});

test.serial("Testeo PelisController search title", async (t) => {
  const controller = new PelisController();
  await controller.add({ id: TEST_ID, title: SOME_TITLE, tags: ["classic", SOME_TAG] });
  const pelis = await controller.get({ search: { title: TEST_ID.toString() } });
  t.true(pelis.length > 0);
  t.is(pelis[0].id, TEST_ID);
  t.is(pelis[0].title, SOME_TITLE);
});

test.serial("Testeo PelisController search tag", async (t) => {
  const controller = new PelisController();
  await controller.add({ id: SECOND_TEST_ID, title: "otra peli un poco más divertida", tags: [SOME_TAG] });
  const pelis = await controller.get({ search: { title: "peli", tag: SOME_TAG } });
  t.true(pelis.length > 0);
  t.deepEqual(pelis.map((b) => b.id), [TEST_ID, SECOND_TEST_ID]);
});
