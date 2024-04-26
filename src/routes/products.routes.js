const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require("../configs/upload");

const ProductsController = require('../controllers/ProductsController');
const ProductsImageController = require('../controllers/ProductsImageController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

//userRoleRoutes.post("/", myMiddleware, productsController.create);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:product_id", productsController.update);
productsRoutes.get("/", productsController.show);
productsRoutes.patch("/image/:product_id", ensureAuthenticated, upload.single("image"), productsImageController.update);

module.exports = productsRoutes;