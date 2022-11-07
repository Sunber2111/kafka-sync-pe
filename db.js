const Pool = require("pg").Pool;
const { faker } = require("@faker-js/faker");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test_db",
  password: "postgres",
  port: 5432,
});

let index = 31999;
let sum = 0;
let req = 0;
// setInterval(() => {
//   index++;
//   pool.query(
//     "INSERT INTO public.comments(id, user_id, post_id, body) VALUES ($1, $2, $3, $4)",
//     [
//       index,
//       getRandomInt(500, 5000),
//       getRandomInt(1000, 5000),
//       faker.lorem.paragraph(),
//     ],
//     (error, results) => {
//       if (!error) {
//         ++sum;
//         console.log(`sum : ${sum}`);
//       }
//     }
//   );
// }, 5);

// setInterval(() => {
//   index++;
//   pool.query(
//     "INSERT INTO public.users(id, email) VALUES ($1, $2)",
//     [index, faker.internet.email()],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       console.log(`ok ${index}`);
//     }
//   );
// }, 5);

// setInterval(() => {
//   index++;
//   pool.query(
//     "INSERT INTO public.posts(id, user_id, title) VALUES ($1, $2, $3)",
//     [index, getRandomInt(1000, 5000), faker.git.commitMessage(100)],
//     (error, results) => {
//       if (!error) {
//         console.log(`ok ${index}`);
//       }
//     }
//   );
// }, 5);
const func = setInterval(() => {
  const startTime = new Date().getTime();
  pool.query(
    "SELECT * FROM public.comments WHERE body LIKE '%labore%' LIMIT 10000",
    (error, results) => {
      if (!error) {
        ++req;
        let endTime = new Date().getTime();
        sum = sum + (endTime - startTime);
        pool.query(
          "SELECT id, user_id, post_id, body FROM public.comments WHERE body NOT LIKE '%labore%'")
        console.log("duration [ms] = " + (endTime - startTime));
      }
    }
  );
}, 350);

// setInterval(() => {
//   console.log(`avg [ms] = ${sum / req}`);
// }, 1000);
