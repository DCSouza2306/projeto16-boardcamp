import connection from "../database/database.js";

export async function categotyBodyValidation(req, res, next) {
  const { name } = req.body;

  if (name === "") {
    return res.status(400).send({ message: "O campo não pode estar vazio" });
  }

  const categoryExist = await connection.query(
    "SELECT * FROM categories WHERE name = $1",
    [name]
  );
  if (categoryExist.rows[0]) {
    return res
      .status(409)
      .send({ message: "Essa categoria já está cadastrada" });
  }

  res.locals.category = name;

  next();
}

