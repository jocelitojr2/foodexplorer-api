
exports.up = knex => knex.schema.createTable("users_roles", table => {
  table.increments("id");
  table.integer("role_id").references("id").inTable("roles").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users_roles");
