import connection from "../database/database.js";

export async function getGames(req, res) {
  const name = req.query.name;
  try {
    if (name) {
      const games = await connection.query('SELECT * FROM games JOIN categories ON games."categoryId" = categories.id');

      const gamesFilter = games.rows.filter(
        (g) => g.name.toLowerCase().includes(name.toLowerCase()) === true
      );

      return res.send(gamesFilter);
    }
    const games = await connection.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id');
    res.send(games.rows);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.game;

  try {
    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1,$2,$3,$4,$5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
