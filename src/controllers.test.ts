import anyTest, { TestFn } from "ava";
import { PelisController } from "./controllers";
import { getRandomId } from "./models.test";
import { Peli } from "./models";

const TEST_ID = getRandomId();
const SOME_TITLE = "una peli " + TEST_ID;
const SOME_TAG = "tag " + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const test = anyTest as TestFn<{
  con: PelisController;
}>;

test.serial(
  "Testeo PelisController get id (creado desde la terminal)",
  async (t) => {
    // testeo peli agregada desde el script test del package
    const controller = new PelisController();
    const peli = await controller.get({ id: 161835 }) as Peli | undefined; // Actualiza el ID según tus necesidades
    t.truthy(peli); // Asegúrate de que se recibe un resultado
    t.is(peli.title, "title 170537161835"); // Actualiza el título según tus necesidades
  }
);


test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });

  const peli = await controller.get({ id: TEST_ID }) as Peli | undefined;
  t.truthy(peli); // Asegurarse de que peli no sea undefined
  if (peli) {
    t.is(peli.title, SOME_TITLE);
  }
});

test.serial("Testeo PelisController search title", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });

  const pelis = await controller.get({
    search: { title: TEST_ID.toString() },
  }) as Peli[];

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
  }) as Peli[];

  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});
