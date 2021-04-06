import test from "ava";
import { PelisController } from "./controllers";

const test = anyTest as TestInterface<{
  con: PelisController;
}>;

test.before(async (t) => {
  const instance = new PelisController();
  t.context.con = instance;

  await instance.add({
    id: 1234,
    title: "una peli",
    tags: ["classic", "action"],
  });
  await instance.add({
    id: 1234,
    title: "una peli",
    tags: ["classic", "action"],
  });
  await instance.add({
    id: 5643,
    title: "otra peli",
    tags: ["action"],
  });
});

test("Testeo PelisController get id", async (t) => {
  const collection = t.context.con;
  const peli = await collection.get({ id: 1234 });
  t.is(peli.title, "una peli");
});

test("Testeo PelisController search title", async (t) => {
  const collection = t.context.con;
  const pelis = await collection.get({ search: { title: "una peli" } });
  t.is(pelis.length, 1);
  t.is(pelis[0].id, 1234);
});

test("Testeo PelisController search tag", async (t) => {
  const collection = t.context.con;
  const pelis = await collection.get({
    search: { title: "peli", tag: "action" },
  });
  const ids = pelis.map((b) => b.id);
  t.deepEqual(ids, [1234, 5643]);
});
