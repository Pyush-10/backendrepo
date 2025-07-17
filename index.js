import "dotenv/config";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("hello from pyush and his tea");
// });

// app.get("/twitter", (req, res) => {
//   res.send("pyush.com");
// });

// app.get("/icetea", (req, res) => {
//   res.send("order ice tea");
// });
app.use(express.json());
//for getting data from frontend side
let teadata = [];
let nextid = 1;
//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newtea = { id: nextid++, name, price };
  teadata.push(newtea);
  res.status(201).send(newtea);
});
// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teadata);
});
// get tea by id
app.get("/teas/:id", (req, res) => {
  const tea = teadata.find((t) => t.id === parseInt(req.params.id));
  // parse int bcoz its return in string format
  //params is used when we used something from url
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  res.status(200).send(tea);
});
//update tea
app.put("/teas/:id", (req, res) => {
  const tea = teadata.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});
//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teadata.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("invalid tea");
  }
  teadata.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`server is listening at port :${port}...`);
});
