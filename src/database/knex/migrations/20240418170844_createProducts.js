
exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id");
  table.text("name").notNullable();;
  table.text("description");
  table.text("image_url").nullable(); 
  table.decimal("price").notNullable();;
  
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");
