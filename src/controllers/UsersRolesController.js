const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersRolesController {
  async show(request, response) {
    const { user_id } = request.params;

    const userRole = await knex("users_roles")
      .join('roles', 'users_roles.role_id', '=', 'roles.id')
      .where('users_roles.user_id', user_id)
      .select('users_roles.*', 'roles.name as role_name')
      .first();

    if (!userRole) {
      throw new AppError("Usuário não encontrado.");
    }

    return response.json({
      id: userRole.id,
      role_id: userRole.role_id,
      role_name: userRole.role_name,
      user_id: userRole.user_id,
      created_at: userRole.created_at,
      updated_at: userRole.updated_at
    });
  }

  async create(request, response) {
    const { role_id, user_id } = request.body;

    const userRole_id = await knex("users_roles").insert({
      role_id,
      user_id
    });

    return response.status(201).json(userRole_id);
  }

  async update(request, response) {
    const { role_id } = request.body;
    const { user_id } = request.params;
    console.log(user_id);

    const userRole = await knex("users_roles").where('user_id', user_id).first();

    if (!userRole) {
      throw new AppError("Usuário não encontrado.");
    }

    userRole.role_id = role_id ?? userRole.role_id;

    await knex("users_roles")
      .where('user_id', user_id)
      .update({
        role_id: userRole.role_id,
        updated_at: knex.fn.now()
      });

    return response.json();
  }
}

module.exports = UsersRolesController;