import anyTest, { TestInterface } from "ava";
import { PelisCollection, Peli } from "./models";

export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();

const test = anyTest as TestInterface<{
  instance: PelisCollection;
  all: Peli[];
}>;

const TEST_ID = getRandomId();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;

const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;

test.before(async (t) => {
  const instance = new PelisCollection();
  t.context.instance = instance;

  await instance.add({
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ["tt", "rr"],
  });
  await instance.add({
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    tags: ["yy", "uu"],
  });

  await instance.add({
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    tags: ["yy", "tt"],
  });

  t.context.all = await instance.getAll();
});

test("Testeo el método getById", async (t) => {
  const collection = t.context.instance;
  const all = t.context.all;
  const a = all[0];
  const b = await collection.getById(a.id);
  t.is(a.title, b.title);
});

test("Testeo el método search", async (t) => {
  const collection = t.context.instance;
  const all = t.context.all;
  const a = all[0];
  const b = await collection.search({ title: SESSION_ID });
  const ids = b.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);

  const c = await collection.search({
    title: SECOND_TEST_ID,
    tag: "yy",
  });
  t.deepEqual(c[0].id, SECOND_TEST_ID);
});

