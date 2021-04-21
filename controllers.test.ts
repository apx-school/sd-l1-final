import anyTest, { TestInterface } from "ava";
import { PelisController } from "./controllers";
import { getRandomId } from "./models.test";

const TEST_ID = getRandomId();
const SOME_TITLE = "una peli " + TEST_ID;
const SOME_TAG = "tag " + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const test = anyTest as TestInterface<{
  con: PelisController;
}>;

test.before(async (t) => {
  const instance = new PelisController();
  t.context.con = instance;
  await instance.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  await instance.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  await instance.add({
    id: SECOND_TEST_ID,
    title: "otra peli un poco más divertida",
    tags: [SOME_TAG],
  });
});

test("Testeo PelisController get id (creado desde la terminal)", async (t) => {
  // testeo peli agregada desde el script test del package
  const collection = t.context.con;
  const peli = await collection.get({ id: 4321865 });
  t.is(peli.title, "peli de la terminal 4321865");
});

test("Testeo PelisController get id", async (t) => {
  const collection = t.context.con;
  const peli = await collection.get({ id: TEST_ID });
  t.is(peli.title, SOME_TITLE);
});

test("Testeo PelisController search title", async (t) => {
  const collection = t.context.con;
  const pelis = await collection.get({ search: { title: TEST_ID.toString() } });
  t.is(pelis.length, 1);
  t.is(pelis[0].id, TEST_ID);
});

test("Testeo PelisController search tag", async (t) => {
  const collection = t.context.con;
  const pelis = await collection.get({
    search: { title: "peli", tag: SOME_TAG },
  });
  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});
