import connection from "../database/database";
import customersSchema from "../models/customersSchema.js";

export async function bodyCustomerValidation(req, res, next) {
  const newCustomer = req.body;

  const { error } = customersSchema.validate(newCustomer, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ message: errors });
  }

  const cpfExist = await connection.query("SELECT * FROM customers WHERE cpf = $1", [
    newCustomer.cpf,
  ]);

  if(cpfExist.rows[0]){
    res.status(409).send({message: "Já existe um cliente cadastrado com esse CPF"})
  }

  res.locals.customer = newCustomer;

  next();
}
