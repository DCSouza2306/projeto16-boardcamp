import connection from "../database/database.js";
import dayjs from "dayjs";

export async function postRentals(req, res) {
  const game = res.locals.game;
  const rental = res.locals.rental;

  const newRental = {
    customerId: rental.customerId,
    gameId: game.id,
    rentDate: dayjs().format("YYYY-MM-DD"),
    daysRented: rental.daysRented,
    returnDate: null,
    originalPrice: game.pricePerDay * rental.daysRented,
    delayFee: null,
  };

  const {
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
  } = newRental;

  try {
    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    res.send(newRental);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getRentals(req, res) {
  const customerId = Number(req.query.customerId);
  const gameId = Number(req.query.gameId);
  try {
    const rentals = await connection.query(
      `SELECT 
        rentals.*,
        TO_CHAR(rentals."rentDate", 'yyyy-mm-dd') AS "rentDate", 
        TO_CHAR(rentals."returnDate", 'yyyy-mm-dd') AS "returnDate", 
        JSON_BUILD_OBJECT('id',customers.id,'name', customers.name) AS "customers",
        JSON_BUILD_OBJECT('id',games.id,
          'name', games.name,
          'categoryId',games."categoryId",
          'categoryName',categories.name) AS "game" 
      FROM rentals JOIN customers 
      ON rentals."customerId" = customers.id 
      JOIN games ON rentals."gameId" = games.id 
      JOIN categories ON games."categoryId" = categories.id`
    );

    if (customerId) {
      const rentalsFilter = rentals.rows.filter(
        (r) => r.customerId === customerId
      );
      return res.send(rentalsFilter);
    }

    if (gameId) {
      const rentalsFilter = rentals.rows.filter((r) => r.gameId === gameId);
      return res.send(rentalsFilter);
    }
    res.send(rentals.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function postRentalsId(req, res) {
  const id = res.locals.id;

  const returnDate = dayjs().format("YYYY-MM-DD");

  try {
    const rental = await connection.query(
      `SELECT TO_CHAR("rentDate", 'yyyy-mm-dd') FROM rentals WHERE id = $1`,
      [id]
    );
    const daysRent =
      new Date(returnDate) -
      new Date(rental.rows[0].to_char) / (1000 * 60 * 60 * 24);

    let delayFee = null;

    if (daysRent > rental.rows[0].daysRented) {
      const delay = daysRent - rental.rows[0].daysRented;

      delayFee = delay * rental.rows[0].pricePerDay;
    }

    await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteRentals(req, res){
    const id = res.locals.id;

    try{
        await connection.query(`DELETE FROM rentals WHERE id = $1`,[id]);

        res.sendStatus(200)
    } catch(e){
        console.log(e);
        res.sendStatus(500)
    }
}
