const express = require("express");
const app = express();
const PORT = 8080;
const cors = require("cors");
const url = require("url");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const { query } = require("express");
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"));

//POST, C-Create, Have user input their own words/definitions
app.post("/definitions/", jsonParser, (req, res) => {
  let db = new sqlite3.Database("Dictionary.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized.");
  });
  console.log(req.body);
  const data = req.body;
  const input = [data.word, data.def];
  const sqlCreateWord = "INSERT INTO entries(word,definition) VALUES (?,?)";
  db.run(sqlCreateWord, input, (err) => {
    if (err) return console.error(err);
    res.send(`Successful entry ${input}`);
  });
  db.close();
});

//GET, R-READ, Get database as a whole
app.get("/definitions", (req, res) => {
  const db = new sqlite3.Database("Dictionary.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized.");
  });
  const sqlGetAll = "SELECT * FROM entries ORDER BY word ASC";
  db.all(sqlGetAll, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
  db.close();
});

// GET, Specific words/definitions
app.get("/definitions/:word", (req, res) => {
  const db = new sqlite3.Database("Dictionary.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized.");
  });
  const search = req.params.word;
  const sqlGetSearch = `SELECT * FROM entries WHERE "${search}" IN (word,wordtype,definition) ORDER BY word ASC`;
  console.log(sqlGetSearch);
  db.all(sqlGetSearch, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
  db.close();
});

app.listen(PORT, () => console.log(`API is live on http://localhost:${PORT}`));
