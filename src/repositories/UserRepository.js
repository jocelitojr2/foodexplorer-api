const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();
    const result = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]
    );

    const userId = result.lastID;

    await database.run(
      "INSERT INTO users_roles (user_id, role_id) VALUES (?, ?)",
      [userId, 2]
    );

    return { id: userId };
  }

}

module.exports = UserRepository;