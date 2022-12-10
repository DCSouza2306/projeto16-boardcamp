import connection from "../database/database.js";

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;

  try {
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1,$2,$3,$4)",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getCustomers(req, res) {
  const cpf = req.query.cpf;
  try {
    if (cpf) {
      const search = `${cpf}%`;
      const customers = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1",
        [search]
      );

      return res.send(customers.rows)
    }

    const customers = await connection.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
