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
productsRoutes.post("/", ensureAuthenticated, upload.single("image"), productsController.create);
productsRoutes.put("/:product_id", ensureAuthenticated, upload.single("image"), productsController.update);
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:product_id", productsController.show);
productsRoutes.patch("/image/:product_id", ensureAuthenticated, upload.single("image"), productsImageController.update);
productsRoutes.delete("/:product_id", ensureAuthenticated, productsController.delete);

module.exports = productsRoutes;