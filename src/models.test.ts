import anyTest, { TestFn } from "ava";
import { PelisCollection, Peli } from "./models";
import * as jsonfile from "jsonfile";

// Función para obtener un ID aleatorio
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
// Comenta todos los tests y descomenta uno a uno a medida que avances

test.serial("Corre ava", async (t) => {
  t.is("si", "si");
});

// Testeo el método getById
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

// Testeo el método search
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
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);

  // El search debe encontrar solo la peli con el title (session) y el tag (yy)
  const c = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: "yy",
  });
  t.deepEqual(c[0].id, SECOND_TEST_ID);
});

// Limpiar el archivo pelis.json después de las pruebas
test.after.always(async () => {
  await jsonfile.writeFile("./pelis.json", []); // Limpia el archivo para evitar conflictos en futuras pruebas
});
