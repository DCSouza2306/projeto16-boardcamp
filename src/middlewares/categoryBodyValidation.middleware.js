import connection from "../database/database.js";

export async function categotyBodyValidation(req, res) {
  const { name } = req.body;

  if (name === "") {
    res.status(400).send({ message: "O campo não pode estar vazio" });
  }

  const categoryExist = connection.query(
    "SELECT (name) FROM categories WHERE name = $1",
    [name]
  );

  if (categoryExist) {
    res.status(409).send({ message: "Essa categoria já está cadastrada" });
  }

  res.locals.category = name;
}
