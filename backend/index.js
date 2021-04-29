const { Pool } = require("pg");
const express = require("express");

const pool = new Pool({
  database: "blog",
  user: "postgres",
  password: "changeme",
  host: "blog_db",
});
pool.connect();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("This is the backend you moron");
});

app.get("/post", (req, res) => {
  const { page = 0, size = 5 } = req.query;
  pool.query(
    {
      text: "SELECT * FROM post OFFSET $1 LIMIT $2",
      values: [page * size, size],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
});

app.get("/post/:id", (req, res) => {
  pool.query(
    {
      text: "SELECT * FROM post WHERE id = $1",
      values: [req.params.id],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
});

app.post("/post", (req, res) => {
  pool.query(
    {
      text: "INSERT INTO post(title, content) VALUES($1, $2) RETURNING id",
      values: [req.body.title, req.body.content],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(201).json({ id: results.rows[0].id });
      }
    }
  );
});

app.put("/post", (req, res) => {
  pool.query(
    {
      text:
        "UPDATE post SET title = $2, content = $3 WHERE id = $1 RETURNING *",
      values: [req.body.id, req.body.title, req.body.content],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
});

app.delete("/post/:id", (req, res) => {
  pool.query(
    {
      text: "DELETE FROM post WHERE id = $1 RETURNING *;",
      values: [req.params.id],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
});

app.listen(8080, "0.0.0.0");
