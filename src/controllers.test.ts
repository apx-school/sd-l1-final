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
 /*
test.serial(
  "Testeo PelisController get id (creado desde la terminal)",
  async (t) => {
    // testeo peli agregada desde el script test del package
    const controller = new PelisController();
    const peli = await controller.getOne({ id: 4321865 });
    //console.log("Peli encontrada:", peli);
    t.is(peli.title, "peli de la terminal 4321865");
  }
);

test.serial("Testeo PelisController get id", async (t) => {
  const controller = new PelisController();
  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ["classic", SOME_TAG],
  });
  const peli = await controller.getOne({ id: TEST_ID });
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
*/
test.serial("Testeo PelisController search tag", async (t) => {
  const controller = new PelisController();
  //console.log("id: ", SECOND_TEST_ID, "    title: otra peli un poco más divertida     tags: ", [SOME_TAG] );
  await controller.add({
    id: SECOND_TEST_ID,
    title: "otra peli un poco más divertida",
    tags: [SOME_TAG],
  });
  //console.log("tipo de dato TAG:" ,typeof(SOME_TAG));
  //console.log("tipo de dato ID:" ,typeof(SECOND_TEST_ID));
  const pelis = await controller.get({
    search: { title: "peli", tag: SOME_TAG },
  });

  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});
