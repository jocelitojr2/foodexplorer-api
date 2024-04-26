const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductsImageController {
  async update(request, response) {
    const { product_id } = request.params;
    const user_id = request.user.id;

    const imageFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if(!user) {
      throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
    }

    const {role_id} = await knex("users_roles").where({ user_id: user_id }).first();

    if(role_id != 1) {
      await diskStorage.deleteFileTemp(imageFileName);
      throw new AppError("Somente administradores do sistema podem mudar a imagem", 401);
    }

    const product = await knex("products").where({ id: product_id }).first();

    if(!product) {
      throw new AppError("Produto não encontrado", 401);
    }

    if(product.image_url) {
      await diskStorage.deleteFile(product.image_url);
    }

    const fileName = await diskStorage.saveFile(imageFileName);
    product.image_url = fileName;

    await knex("products").update(product).where({ id: product_id });

    return response.json(product);
  }

}

module.exports = ProductsImageController;