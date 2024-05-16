const { Router } = require('express');
const multer = require('multer');
const uploadConfig = require("../configs/upload");

const ProductsController = require('../controllers/ProductsController');
const ProductsImageController = require('../controllers/ProductsImageController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const productsRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

productsRoutes.use(ensureAuthenticated);
productsRoutes.post("/", verifyUserAuthorization([1]), upload.single("image"), productsController.create);
productsRoutes.put("/:product_id", verifyUserAuthorization([1]), upload.single("image"), productsController.update);
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:product_id", productsController.show);
productsRoutes.patch("/image/:product_id", verifyUserAuthorization([1]), upload.single("image"), productsImageController.update);
productsRoutes.delete("/:product_id", verifyUserAuthorization([1]), productsController.delete);

module.exports = productsRoutes;