const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductsController {
  async index(request, response) {
    try {
        const products = await knex("products")
            .select(
                "products.id",
                "products.name",
                "products.description",
                "products.price",
                "products.image_url",
                "categories.id as category_id",
                "categories.name as category_name"
            )
            .leftJoin("products_categories", "products_categories.product_id", "products.id")
            .leftJoin("categories", "products_categories.category_id", "categories.id");

        if (products.length === 0) {
          throw new AppError("Não possui produtos cadastrados.");
        }

        return response.json(products.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image_url: product.image_url,
                category: {
                    id: product.category_id,
                    name: product.category_name
                }
            };
        }));
    } catch (error) {
      throw new AppError('Erro interno no servidor.');
    }
  }

  async show(request, response) {
    const { product_id } = request.params;

    const product = await knex.select('*').from('products').where({ id: product_id}).first();

    if (!product) {
      throw new AppError("Não foi encontrado o produto informado.");
    }

    const category = await knex('products_categories')
                            .select("categories.name", "categories.id")
                            .join('categories', 'products_Categories.category_id', 'categories.id')
                            .where('products_categories.product_id', product.id)
                            .first();

    const ingredients = await knex('ingredients')
                                .select("ingredients.name", "ingredients.id")
                                .where({ product_id });

    return response.json({product, category, ingredients});
  }

  async create(request, response) {
    const { name, description, price, category_id } = request.body;
    let { ingredients } = request.body;
    const imageFile = request.file;

    if (!imageFile) {
      throw new AppError("Arquivo de imagem é obrigatório.");
    }

    try {
        if (typeof ingredients === 'string') {
            ingredients = JSON.parse(ingredients);
        }
    } catch (error) {
      throw new AppError("Erro ao analisar os ingredientes. Certifique-se de que está no formato JSON correto.");
    }

    if (!Array.isArray(ingredients)) {
      throw new AppError("Formato inválido para ingredientes, esperado um array.");
    }

    const diskStorage = new DiskStorage();
    const imageFileName = imageFile.filename;

    try {
      await knex.transaction(async trx => {
        const [product_id] = await trx("products").insert({
          name,
          description,
          image_url: imageFileName,
          price
        });

        const savedImagePath = await diskStorage.saveFile(imageFileName);

        await trx("products").where({ id: product_id }).update({
          image_url: savedImagePath
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
    const { name, description, price, category_id } = request.body;
    let { ingredients } = request.body;
    const { product_id } = request.params;
    const imageFile = request.file;
    const diskStorage = new DiskStorage();

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
          
          if (imageFile) {
            const imageFileName = imageFile.filename;
            var savedImagePath = await diskStorage.saveFile(imageFileName);
          }

          if (typeof ingredients === 'string') {
            ingredients = JSON.parse(ingredients);
          }

          await trx("products").where('id', product_id).update({
              name: name ?? product.name,
              description: description ?? product.description,
              image_url: savedImagePath ?? product.image_url,
              price: price ?? product.price,
              updated_at: trx.fn.now()
          });          

          if (ingredients.length > 0) {
            await trx("ingredients").where('product_id', product_id).delete();

            const ingredientsObjects = ingredients.map(ingredientName => {
              return {
                  product_id: product_id,
                  name: ingredientName
              };
            });

            await trx("ingredients").insert(ingredientsObjects);
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

  async delete(request, response) {
    const { product_id } = request.params;

    const diskStorage = new DiskStorage();

    try {
      await knex.transaction(async trx => {
        const product = await trx("products").where('id', product_id).first();

        if (!product) {
          throw new AppError("Produto não encontrado.");
        }
        
        if (product.image_url != "" || product.image_url != null) {
          await diskStorage.deleteFile(product.image_url);
        }
        
        await trx("products").where('id', product_id).delete();
        
        return response.status(200).json({ message: 'Produto deletado com sucesso!' });
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(404).json({ error: error.message });
      }
      return response.status(500).json({ error: 'Erro interno no servidor.' });
    }
  } 
}

module.exports = ProductsController;