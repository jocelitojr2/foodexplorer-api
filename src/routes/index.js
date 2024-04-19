const { Router } = require("express");

const usersRouter = require("./users.routes");
const usersRoles = require("./usersRoles.routes");
const rolesRouter = require("./roles.routes");
const categoriesRouter = require("./categories.routes");
const productsRouter = require("./products.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/usersRoles", usersRoles);
routes.use("/roles", rolesRouter);
routes.use("/categories", categoriesRouter);
routes.use("/products", productsRouter);

module.exports = routes;