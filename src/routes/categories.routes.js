const { Router } = require('express');

const CategoriesController = require('../controllers/CategoriesController');

const categoriesRoutes = Router(); 

// function myMiddleware(request, response, next) {

//   if (!request.body.isAdmin) {
//     return response.json({ message: "User aunauthorized" });
//   }

//   next();
// }

const categoriesController = new CategoriesController();

//userRoleRoutes.post("/", myMiddleware, categoriesController.create);
categoriesRoutes.post("/", categoriesController.create);
categoriesRoutes.put("/:categorie_id", categoriesController.update);
categoriesRoutes.get("/", categoriesController.show);

module.exports = categoriesRoutes;