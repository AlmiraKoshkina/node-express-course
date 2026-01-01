const { people } = require("../data");

const getPeople = (req, res) => {
  res.json(people);
};

const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  people.push({ id: people.length + 1, name });

  res.status(201).json({ success: true, name });
};

const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({ message: "Person not found" });
  }

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }

  person.name = name;

  res.status(200).json({ success: true, person });
};

const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);

  const exists = people.some((p) => p.id === id);
  if (!exists) {
    return res.status(404).json({ message: "Person not found" });
  }

  const updated = people.filter((p) => p.id !== id);
  people.length = 0;
  people.push(...updated);

  res.status(200).json({ success: true });
};

module.exports = {
  getPeople,
  addPerson,
  getPersonById,
  updatePerson,
  deletePerson,
};
