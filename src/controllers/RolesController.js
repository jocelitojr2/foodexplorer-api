const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class RolesController {
  async create(request, response) {
    const { name, description } = request.body;

    const role_id = await knex("roles").insert({
      name,
      description
    });

    return response.status(201).json(role_id);
  }
}

module.exports = RolesController;