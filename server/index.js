const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middelware
app.use(cors());
app.use(express.json());

// get all cocktails

app.get("/cocktails", async (req, res) => {
  try {
    const allCocktails = await pool.query("SELECT * FROM cocktails");
    console.log(allCocktails);
    res.json(allCocktails.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a cocktail

app.get("/cocktails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cocktails = await pool.query(
      "SELECT * FROM cocktails WHERE idDrink = $1",
      [id]
    );

    res.json(cocktails.rows[0]);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
