const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  database: "blog",
  user: "postgres",
  password: "changeme",
  host: "blog_db",
});
pool.connect();

const saltRounds = 10;
const JWT_KEY = "th3ylln3v3rkn0w";

const app = express();
app.use(express.json(), cors({ origin: "http://localhost:3000" }));

function verifyRequestAuthorization(req) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const reqToken = authHeader.split(" ")?.[1];
    try {
      return jwt.verify(reqToken, JWT_KEY);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

app.get("/", (req, res) => {
  res.status(418).send("I'm the backend");
});

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      pool.query(
        {
          text:
            "INSERT INTO users(username, email, password, created) VALUES($1, $2, $3, current_timestamp) RETURNING id",
          values: [req.body.username, req.body.email, hash],
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
    }
  });
});

app.post("/login", (req, res) => {
  pool.query(
    {
      text: "SELECT password FROM users WHERE email = $1",
      values: [req.body.email],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        bcrypt.compare(
          req.body.password,
          results.rows[0]?.password,
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send();
            } else if (result) {
              const token = jwt.sign({ result: result }, JWT_KEY);
              pool.query(
                {
                  text:
                    "UPDATE users SET token = $1 WHERE email = $2 RETURNING token",
                  values: [token, req.body.email],
                },
                (error, results) => {
                  if (error) {
                    console.log(error);
                    res.status(500).send();
                  } else {
                    res.status(200).send(results.rows[0]?.token);
                  }
                }
              );
            } else {
              res.status(401).send();
            }
          }
        );
      }
    }
  );
});

app.get("/post", (req, res) => {
  const { page = 0, size = 5 } = req.query;
  pool.query(
    {
      text:
        "SELECT *, Count(*) OVER () AS TotalCount FROM post ORDER BY created DESC OFFSET $1 LIMIT $2",
      values: [page * size, size],
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      } else {
        res.status(200).json({
          page: results.rows.map((row) => ({
            id: row.id,
            title: row.title,
            content: row.content,
            created: row.created,
          })),
          totalPages: Math.ceil(results.rows[0]?.totalcount / size),
        });
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
  const validity = verifyRequestAuthorization(req);
  if (validity) {
    pool.query(
      {
        text:
          "INSERT INTO post(title, content, created) VALUES($1, $2, current_timestamp) RETURNING id",
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
  } else {
    res.status(401).send();
  }
});

app.put("/post", (req, res) => {
  const validity = verifyRequestAuthorization(req);
  if (validity) {
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
  } else {
    res.status(401).send();
  }
});

app.delete("/post/:id", (req, res) => {
  const validity = verifyRequestAuthorization(req);
  if (validity) {
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
  } else {
    res.status(401).send();
  }
});

app.listen(8080, "0.0.0.0");
