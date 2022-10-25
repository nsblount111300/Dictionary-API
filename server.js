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

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.static("public"));

//POST, C-Create
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

//GET, R-READ
app.get("/definitions", (req, res) => {
  let db = new sqlite3.Database("Dictionary.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized.");
  });
  sqlGetAll = "SELECT * FROM entries ORDER BY word ASC";
  db.all(sqlGetAll, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
  db.close();
});

app.get("/definitions/:word", (req, res) => {
  let db = new sqlite3.Database("Dictionary.db", (err) => {
    if (err) return console.error(err.message);
    console.log("sqlite3 initialized.");
  });
  const search = req.params.word;
  const searchDef = `SELECT * FROM entries WHERE "${search}" IN (word, definition) ORDER BY word ASC `;
  console.log(search);
  db.all(searchDef, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
  db.close();
});
app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
