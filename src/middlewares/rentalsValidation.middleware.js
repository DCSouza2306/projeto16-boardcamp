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

export async function returnRentalsValidation (req, res, next){
  const {id} = req.params;

  const rentalExist = await connection.query("SELECT * FROM rentals WHERE id = $1",[id])

  if(!rentalExist.rows[0]){
    return res.status(404).send({message: "Aluguel inexiste"})
  }

  if(rentalExist.rows[0].returnDate !== null){
    return res.status(400).send({message: "Esse aluguel já foi finalizado"})
  }

  res.locals.id = id;
  next();
}

export async function deleteRentalsValidation(req, res, next){
  const {id} = req.params;

  const rentalExist = await connection.query("SELECT * FROM rentals WHERE id = $1",[id])

  if(!rentalExist.rows[0]){
    return res.status(404).send({message: "Aluguel inexiste"})
  }

  if(rentalExist.rows[0].returnDate === null){
    return res.status(400).send({message: "Esse aluguel não pode ser excluido"})
  }

  res.locals.id = id;
  next();
}
