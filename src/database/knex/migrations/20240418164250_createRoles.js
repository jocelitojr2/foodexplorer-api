
exports.up = knex => knex.schema.createTable("roles", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("description");
  
  table.timestamp("created_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("roles");
