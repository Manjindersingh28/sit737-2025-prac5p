const express = require("express");
const app = express();
const logger = require("./logger");

const add = (n1, n2) => n1 + n2;
const sub = (n1, n2) => n1 - n2;
const multi = (n1, n2) => n1 * n2;
const div = (n1, n2) => n1 / n2;

const calculate = (operation, req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    logger.info(`Received ${operation} request with n1=${n1}, n2=${n2}`);
    if (isNaN(n1)) throw new Error("n1 incorrectly defined");
    if (isNaN(n2)) throw new Error("n2 incorrectly defined");

    const result = operation(n1, n2);
    logger.info(`Result of ${operation}: ${result}`);
    res.status(200).json({ statusCode: 200, data: result });
  } catch (error) {
    logger.error(`Error in ${operation}: ${error.message}`);
    res.status(500).json({ statusCode: 500, msg: error.toString() });
  }
};

app.get("/add", (req, res) => calculate(add, req, res));
app.get("/sub", (req, res) => calculate(sub, req, res));
app.get("/multi", (req, res) => calculate(multi, req, res));
app.get("/div", (req, res) => calculate(div, req, res));

const port = 3040;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
