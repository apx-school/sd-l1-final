import anyTest, { TestFn } from "ava";
import { PelisCollection, Peli } from "./models";

// Función para generar un ID aleatorio para las pruebas
export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();

const test = anyTest as TestFn<{
  instance: PelisCollection;
  all: Peli[];
}>;

// Definir los IDs y títulos para las pruebas
const TEST_ID = getRandomId();
const TEST_TITLE = "title " + SESSION_ID + TEST_ID;

const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = "title " + SESSION_ID + SECOND_TEST_ID;

// # IMPORTANTE #

// Apenas clones este repo
// Todos los tests a continuación van a fallar

// Comentalos y descomentalos uno a uno a medida
// que vas avanzando en cada test

test.serial("Corre ava", async (t) => {
  t.is("si", "si");
});

// Test para verificar el método getById
test.serial("Testeo el método getById", async (t) => {
  const collection = new PelisCollection();
  // Agregar una película a la colección
  await collection.add({
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ["tt", "rr"],
  });
  // Obtener todas las películas
  const all = await collection.getAll();
  const a = all[0]; // La primera película en la lista
  const b = await collection.getById(a.id); // Buscarla por ID
  t.is(a.title, b?.title); // Verificar que el título sea el mismo
});

// Test para verificar el método search con título
test.serial("Testeo el método search", async (t) => {
  const collection = new PelisCollection();
  // Agregar dos películas con diferentes títulos
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

  // Obtener todas las películas y realizar búsqueda por título
  const all = await collection.getAll();
  const a = all[0]; // La primera película en la lista
  // El search debe encontrar ambas pelis creadas a partir de la session
  const b = await collection.search({ title: SESSION_ID.toString() });
  const ids = b.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]); // Verificar que ambas películas estén en los resultados

  // El search debe encontrar solo la peli con el título (session) y el tag (yy)
  const c = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: "yy",
  });
  t.deepEqual(c[0].id, SECOND_TEST_ID); // Verificar que solo la segunda película esté en los resultados
});
