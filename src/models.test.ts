import anyTest, { TestFn } from "ava";
import { PelisCollection, Peli } from "./models";

// Función para generar IDs aleatorios
export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();
const TEST_ID = getRandomId();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;
const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;

const test = anyTest as TestFn<{
  instance: PelisCollection;
  all: Peli[];
}>;

test.serial("Corre ava", async (t) => {
  t.is("si", "si");
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
  
  // Verificamos que getById devuelva el objeto correcto
  const b = await collection.getById(a.id);
  t.is(a.title, b?.title);
});

test.serial("Testeo el método search", async (t) => {
  const collection = new PelisCollection();
  
  // Agregamos dos películas a la colección
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

  // Buscamos todas las pelis por la session_id en el title
  const b = await collection.search({ title: SESSION_ID.toString() });
  const ids = b.map((b) => b.id);
  
  // Verificamos que ambas películas sean encontradas
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);

  // Buscamos una peli con un title y tag específicos
  const c = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: "yy",
  });
  
  // Verificamos que la segunda película sea encontrada
  t.deepEqual(c[0].id, SECOND_TEST_ID);
});
