import anyTest, { TestFn } from "ava";
import { PelisCollection, Peli } from "./models";

export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();

const test = anyTest as TestFn<{
  instance: PelisCollection;
  all: Peli[];
}>;

const TEST_ID = getRandomId();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;

const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;

// # IMPORTANTE #

// apenas te clones este repo
// todos los test a continuación van a fallar

// comentalos y descomentá uno a uno a medida
// que vas avanzando en cada test

test.serial("Corre ava", async (t) => {
  t.is("si", "si");
});

test.serial("Testeo metodo getAll", async (t) => {
  const collections = new PelisCollection();
  const pelis = await collections.getAll();
  t.is(pelis.length, 4);
});

test.serial("Testeo el método getById", async (t) => {
  const collection = new PelisCollection();
  await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ["tt", "rr"],
  });
  const all = await collection.getAll();
  const a = all[0];
  const b = await collection.getById(a.id);
  t.is(a.title, b.title);
});

test("search por título (case insensitive)", async (t) => {
  const collection = new PelisCollection();
  await collection.getAll();
  const resultado = await collection.search({ title: "avengers" });
  t.true(resultado.length > 0);
  t.true(resultado.some((p) => p.title.toLowerCase().includes("avengers")));
});

test("search por tag (case insensitive)", async (t) => {
  const collection = new PelisCollection();
  await collection.getAll();
  const resultado = await collection.search({ tag: "accion" });
  t.true(resultado.length > 0);
  t.true(
    resultado.some((p) =>
      p.tags.map((tag) => tag.toLowerCase()).includes("accion")
    )
  );
});

test("search por título y tag juntos", async (t) => {
  const collection = new PelisCollection();
  await collection.getAll();
  const resultado = await collection.search({
    title: "avengers",
    tag: "accion",
  });
  t.true(resultado.length > 0);
  t.true(
    resultado.every(
      (p) =>
        p.title.toLowerCase().includes("avengers") &&
        p.tags.map((tag) => tag.toLowerCase()).includes("accion")
    )
  );
});

test("search por título inexistente", async (t) => {
  const collection = new PelisCollection();
  await collection.getAll();
  const resultado = await collection.search({ title: "noexiste" });
  t.deepEqual(resultado, []);
});

test("search por tag inexistente", async (t) => {
  const collection = new PelisCollection();
  await collection.getAll();
  const resultado = await collection.search({ tag: "noexiste" });
  t.deepEqual(resultado, []);
});

test("search sin parámetros", async (t) => {
  const collection = new PelisCollection();
  const todas = await collection.getAll();
  const resultado = await collection.search({});
  t.deepEqual(resultado, todas);
});

test.serial("Testeo el método search", async (t) => {
  const collection = new PelisCollection();
  await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ["tt", "rr"],
  });
  await collection.add({
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    tags: ["yy", "uu"],
  });
  const all = await collection.getAll();
  const a = all[0];
  // El search debe encontrar ambas pelis creadas a partir de la session
  const b = await collection.search({ title: SESSION_ID.toString() });
  const ids = b.map((b) => b.id);
  t.deepEqual(ids.sort(), [TEST_ID, SECOND_TEST_ID].sort());

  // El search debe encontrar solo la peli con el title (session) y el tag (yy)
  const c = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: "yy",
  });
  t.deepEqual(c[0].id, SECOND_TEST_ID);
});
