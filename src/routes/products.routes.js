const { Router } = require('express');

const ProductsController = require('../controllers/ProductsController');

const productsRoutes = Router(); 

// function myMiddleware(request, response, next) {

//   if (!request.body.isAdmin) {
//     return response.json({ message: "User aunauthorized" });
//   }

//   next();
// }

const productsController = new ProductsController();

//userRoleRoutes.post("/", myMiddleware, productsController.create);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:product_id", productsController.update);
productsRoutes.get("/", productsController.show);

module.exports = productsRoutes;