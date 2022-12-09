import connection from "../database/database.js";

export async function categotyBodyValidation(req, res, next) {
  const newCategory = req.body;

  if (newCategory.name === "") {
    return res.status(400).send({ message: "O campo não pode estar vazio" });
  }

  const categoryExist = connection.query(
    "SELECT (name) FROM categories WHERE name = $1",
    [newCategory.name]
  );

  if(categoryExist.rows){
    return res.status(409).send({message: "Essa categoria já está cadastrada"})
  }

  res.locals.category = newCategory;

  next();
}
