const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProductsController {
  async show(request, response) {

    const products = await knex.select('*').from('products');

    if (products.length === 0) {
      throw new AppError("Não possui produtos cadastrados.");
    }

    return response.json(products);
  }

  async create(request, response) {
    const { name, description, image_url, price, ingredients, category_id } = request.body;

    try {
      await knex.transaction(async trx => {
        const [product_id] = await trx("products").insert({
          name,
          description,
          image_url,
          price
        });

        await trx("products_categories").insert({
          product_id: product_id,
          category_id: category_id
        });
    
    
        const ingredientsInsert = ingredients.map(ingredient => {
          return {
            product_id: product_id,
            name: ingredient
          }
        });
    
        await trx("ingredients").insert(ingredientsInsert);

      });

      return response.status(200).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
          return response.status(404).json({ error: error.message });
        }
        console.log(error.message);
        return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }

  async update(request, response) {
    const { name, description, image_url, price, ingredients, category_id } = request.body;
    const { product_id } = request.params;

    try {
      await knex.transaction(async trx => {
          const product = await trx("products").where('id', product_id).first();
          if (!product) {
            throw new AppError("Produto não encontrado.");
          }

          if (category_id) {
            const categoryExists = await trx("categories").where('id', category_id).first();
            if (!categoryExists) {
                throw new AppError("Categoria não encontrada.");
            }

            const productCategory = await trx("products_categories").where('product_id', product_id).first();
            if (productCategory) {
                await trx("products_categories").where('product_id', product_id).update({
                    category_id: category_id
                });
            } else {
                await trx("products_categories").insert({
                    product_id: product_id,
                    category_id: category_id
                });
            }
          }


          await trx("products").where('id', product_id).update({
              name: name ?? product.name,
              description: description ?? product.description,
              image_url: image_url ?? product.image_url,
              price: price ?? product.price,
              updated_at: trx.fn.now()
          });          
          
          if (ingredients && ingredients.length > 0) {
            await trx("ingredients").where('product_id', product_id).delete();

            const ingredientsInsert = ingredients.map(ingredient => {
              return {
                  product_id: product_id,
                  name: ingredient
              };
            });

            await trx("ingredients").insert(ingredientsInsert);
          }
      });

      return response.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        if (error instanceof AppError) {
          return response.status(404).json({ error: error.message });
        }
        return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }
}

module.exports = ProductsController;