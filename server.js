const express = require("express");
const app = express();
const Pool = require("pg").Pool;
const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://localhost:9200" });

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test_db",
  password: "postgres",
  port: 5432,
});

app.get("/", async (req, res) => {
  await pool.query(
    "SELECT * FROM public.comments WHERE body like '%labore%' and (post_id='3598' or post_id='6543' or post_id='5551' or post_id='69') LIMIT 10000"
  );
  res.json("234");
});

app.get("/v2", async (req, res) => {
  let rtr = await client.search({
    index: "postgresdb.public.comments",
    body: {
      query: {
        bool: {
          must: [
            {
              match_phrase: { body: { query: "labore", slop: 1 } },
            },
            {
              bool: {
                should: [
                  {
                    match: {
                      post_id: "3598",
                    },
                  },
                  {
                    match: {
                      post_id: "6543",
                    },
                  },
                  {
                    match: {
                      post_id: "5551",
                    },
                  },
                  {
                    match: {
                      post_id: "69",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      size: 9999,
    },
  });
  res.json("234");
});

app.listen(3000);
