import connection from "../database/database.js";

export async function gamesBodyValidation(req, res, next) {
    const newGame = req.body;
    if (
      newGame.name === "" ||
      newGame.stockTotal === 0 ||
      newGame.pricePerDay === 0
    ) {
      return res.sendStatus(400);
    }
  
    const categoyExists = await connection.query(
      "SELECT * FROM categories WHERE id = $1",
      [newGame.categoryId]
    );
  
    if (!categoyExists.rows[0]) {
      return res.status(400).send({message: "Categoria inexistente"});
    }
  
    const nameExist = await connection.query(
      "SELECT * FROM games WHERE name = $1",
      [newGame.name]
    )
  
    if(nameExist.rows[0]){
      return res.sendStatus(409);
    }
  
    res.locals.game = newGame;
  
    next();
  }
  