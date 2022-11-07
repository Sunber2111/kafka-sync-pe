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
    "SELECT * FROM public.comments WHERE body LIKE '%labore%' LIMIT 10000"
  );
  res.json("result");
});

app.get("/v2", async (req, res) => {
  await client.search({
    index: "postgresdb.public.comments",
    body: {
      query: { match: { body: "labore" } },
      size: 9999,
    },
  });
  res.json("result");
});

app.listen(3000);
