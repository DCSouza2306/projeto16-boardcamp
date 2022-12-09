import { response } from "express";
import connection from "../database/database.js";

export async function getCategories(req, res) {
  try {
    const categories = await connection.query("SELECT * FROM categories");
    res.send(categories);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function postCategories(req, res) {
  const newCategory = req.body;
  try {
    await connection.query("INSERT INTO categories (name) VALUES ($1)", [
      newCategory,
    ]);
    res.send(201)
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
