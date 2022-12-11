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
