import connection from "../database/database.js";

export async function rentalsValidation(req, res, next) {
  const rental = req.body;
  res.locals.rental = rental;

  if (rental.daysRented === 0) {
    return res
      .status(400)
      .send({ message: "Os dias de alugueis não podem ser igual a 0" });
  }

  const customerExist = await connection.query(
    "SELECT * FROM customers WHERE id = $1",
    [rental.customerId]
  );

  if (!customerExist.rows[0]) {
    return res.status(400).send({ message: "Usuário não existe" });
  };

  const gameExist = await connection.query(
    "SELECT * FROM games WHERE id = $1",
    [rental.gameId]
  );

  if (!gameExist.rows[0]) {
    return res.status(400).send({ message: "Jogo não existe" });
  }

  if (gameExist.rows[0].stockTotal === 0) {
    return res
      .status(400)
      .send({ message: "O jogo não possui estoque disponivel" });
  }

  res.locals.game = gameExist.rows[0];

  next();
}
