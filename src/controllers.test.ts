import anyTest, { TestFn } from 'ava';
import { MovieController } from './controllers';
import { getRandomId } from './models.test';

const TEST_ID = getRandomId();
const SOME_TITLE = 'a movie ' + TEST_ID;
const SOME_TAG = 'tag ' + TEST_ID;

const SECOND_TEST_ID = getRandomId();

const test = anyTest as TestFn<{
  controller: MovieController;
}>;

test.serial(
  'Test MovieController get by id (created from terminal)',
  async (t) => {
    const controller = new MovieController();
    const movie = await controller.getOne({ id: 4321865 });
    console.log(movie);
    t.is(movie.title, 'movie from terminal 4321865');
  },
);

test.serial('Test MovieController get by id', async (t) => {
  const controller = new MovieController();

  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ['classic', SOME_TAG],
  });

  const movie = await controller.getOne({ id: TEST_ID });
  t.is(movie.title, SOME_TITLE);
});

test.serial('Test MovieController search by title', async (t) => {
  const controller = new MovieController();

  await controller.add({
    id: TEST_ID,
    title: SOME_TITLE,
    tags: ['classic', SOME_TAG],
  });

  const movies = await controller.get({
    search: { title: TEST_ID.toString() },
  });
  t.is(movies.length, 1);
  t.is(movies[0].id, TEST_ID);
});

test.serial('Test MovieController search by tag', async (t) => {
  const controller = new MovieController();

  await controller.add({
    id: SECOND_TEST_ID,
    title: 'another more fun movie',
    tags: [SOME_TAG],
  });

  const movies = await controller.get({
    search: { title: 'movie', tag: SOME_TAG },
  });

  const ids = movies.map((m) => m.id);
  t.deepEqual(ids, [TEST_ID, SECOND_TEST_ID]);
});
