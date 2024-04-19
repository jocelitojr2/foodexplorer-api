const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class CategoriesController {
  async show(request, response) {

    const categories = await knex.select('*').from('categories');

    if (categories.length === 0) {
      throw new AppError("Não possui categorias cadastradas.");
    }

    return response.json(categories);
  }

  async create(request, response) {
    const { name, description } = request.body;

    await knex("categories").insert({
      name,
      description
    });

    return response.json();
  }

  async update(request, response) {
    const { name, description } = request.body;
    const { categorie_id } = request.params;

    const categorie = await knex("categories").where('id', categorie_id).first();

    if (!categorie) {
      throw new AppError("Categoria não encontrada.");
    }

    categorie.name = name ?? categorie.name;
    categorie.description = description ?? categorie.description;

    await knex("categories")
      .where('id', categorie_id)
      .update({
        name: categorie.name,
        description: categorie.description,
        updated_at: knex.fn.now()
      });

    return response.json();
  }
}

module.exports = CategoriesController;