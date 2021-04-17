import anyTest, { TestInterface } from "ava";
import { PelisCollection, Peli } from "./models";

const test = anyTest as TestInterface<{
  instance: PelisCollection;
  all: Peli[];
}>;

test.before(async (t) => {
  const instance = new PelisCollection();
  t.context.instance = instance;

  await instance.add({
    id: 3456,
    title: "abc asd",
    tags: ["tt", "rr"],
  });
  await instance.add({
    id: 7878,
    title: "asd fgh",
    tags: ["yy", "uu"],
  });

  await instance.add({
    id: 7878,
    title: "asd abc",
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
  const b = await collection.search({ title: "asd" });
  const ids = b.map((b) => b.id);
  t.deepEqual(ids, [3456, 7878]);
  const c = await collection.search({ title: "asd", tag: "yy" });
  t.deepEqual(c[0].id, 7878);
});
test("Testeo el método add", async (t) => {
  const randomNumber = Math.floor(Math.random() * 100000);
  const newID = 111222 + randomNumber;
  const collection = t.context.instance;
  const title = "del test " + newID;
  await collection.add({
    id: newID,
    title: title,
    tags: [],
  });
  const found = await collection.getById(newID);
  t.is(found.title, title);
});
