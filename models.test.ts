import anyTest, { TestFn } from "ava";
import { PelisCollection, Peli } from "./models";

export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

export const getRandomRating = () => {
  const randomNumber = Math.random() * 10;
  return randomNumber;
}

const SESSION_ID = getRandomId();

const test = anyTest as TestFn<{
  instance: PelisCollection;
  all: Peli[];
}>;

const TEST_ID = getRandomId();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;
const TEST_RATING = getRandomRating();

const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;
const SECOND_TEST_RATING = getRandomRating();

// # IMPORTANTE #

// apenas te clones este repo
// todos los test a continuación van a fallar

// comentalos y descomentá uno a uno a medida
// que vas avanzando en cada test

test.serial("Corre ava", async (t) => {
  t.is("si", "si");
});

test.serial("Testeo el método getById", async (t) => {
  const collection = new PelisCollection();
  await collection.load();
  await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    rating: TEST_RATING,
    tags: ["tt", "rr"],
  });
  const all = await collection.getAll();
  const a = all[0];
  const b = await collection.getById(a.id);
  t.is(a.title, b.title);
});

test.serial("Testeo el método search", async (t) => {
  const collection = new PelisCollection();
  await collection.load();
  await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    rating: TEST_RATING,
    tags: ["tt", "rr"],
  });
  await collection.add({
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    rating: SECOND_TEST_RATING,
    tags: ["yy", "uu"],
  });
  const all = await collection.getAll();
  const a = all[0];
  const b = await collection.search({ title: SESSION_ID.toString()});
  const ids = b.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);

  const c = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: "yy",
  });
  t.deepEqual(c[0].id, SECOND_TEST_ID);
});
