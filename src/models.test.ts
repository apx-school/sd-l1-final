import anyTest, { TestFn } from 'ava';
import { MoviesCollection, Movie } from './models';

export const getRandomId = () => {
  const randomNumber = Math.floor(Math.random() * 100000);
  return 129856 + randomNumber;
};

const SESSION_ID = getRandomId();

const test = anyTest as TestFn<{
  instance: MoviesCollection;
  all: Movie[];
}>;

const TEST_ID = getRandomId();
const TEST_TITLE = 'title ' + SESSION_ID + TEST_ID;

const SECOND_TEST_ID = getRandomId();
const SECOND_TEST_TITLE = 'title ' + SESSION_ID + SECOND_TEST_ID;

test.serial('Ava OK', async (t) => {
  t.is('si', 'si');
});

test.serial('Test method: getById', async (t) => {
  const collection = new MoviesCollection();
  const movie = {
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ['tt', 'rr'],
  };

  await collection.add(movie);
  const foundMovie = await collection.getById(TEST_ID);

  t.is(movie.title, foundMovie.title);
});

test.serial('Test method: search', async (t) => {
  const collection = new MoviesCollection();
  const firstMovie = {
    id: TEST_ID,
    title: TEST_TITLE,
    tags: ['tt', 'rr'],
  };

  const secondMovie = {
    id: SECOND_TEST_ID,
    title: SECOND_TEST_TITLE,
    tags: ['yy', 'uu'],
  };

  await collection.add(firstMovie);
  await collection.add(secondMovie);

  const foundMovies = await collection.search({
    title: SESSION_ID.toString(),
  });

  t.is(foundMovies.length, 2);
  t.deepEqual(
    foundMovies.map((m) => m.id).sort(),
    [TEST_ID, SECOND_TEST_ID].sort(),
  );

  const filteredMovies = await collection.search({
    title: SECOND_TEST_ID.toString(),
    tag: 'yy',
  });

  t.is(filteredMovies.length, 1);
  t.is(filteredMovies[0].id, SECOND_TEST_ID);
});
