
exports.up = knex => knex.schema.createTable("products_categories", table => {
  table.increments("id");
  table.integer("category_id").references("id").inTable("categories").onDelete("CASCADE");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products_categories");
