const { Router } = require('express');

const CategoriesController = require('../controllers/CategoriesController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const categoriesRoutes = Router(); 

const categoriesController = new CategoriesController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post("/", verifyUserAuthorization([1]), categoriesController.create);
categoriesRoutes.put("/:categorie_id", verifyUserAuthorization([1]), categoriesController.update);
categoriesRoutes.get("/", categoriesController.show);

module.exports = categoriesRoutes;