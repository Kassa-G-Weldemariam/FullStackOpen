const express = require("express");
const morgan = require("morgan");

const app = express();

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "5",
    name: "kebede",
    number: 4034383938,
  },
];

app.use(express.json());
app.use(morgan("tiny"));
morgan.token("data", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data"),
);
app.use(express.static("dist"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/info", (req, res) => {
  const date = new Date().toString();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> <br/> ${date}`,
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({
      error: "person not found",
    });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({
      error: "person not found",
    });
  }
  res.status(204).end();
});

const generatedId = () => {
  const id = Math.floor(Math.random() * 100);
  return String(id);
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  const id = generatedId();
  if (persons.find((p) => p.id === id)) {
    return res
      .status(400)
      .json({ error: "id is already used, try another hit" });
  }
  if (!name || !number) {
    return res.status(400).json({ error: "please provide name and number" });
  }
  if (persons.find((n) => n.name === name)) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const person = {
    id: id,
    name: name,
    number: number,
  };
  res.json(persons.concat(person));
});

const port = 3001;
app.listen(port, () => {
  console.log("server running on port", port);
});
