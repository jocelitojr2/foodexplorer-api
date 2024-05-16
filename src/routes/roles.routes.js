const { Router } = require('express');

const RolesController = require('../controllers/RolesController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const rolesRoutes = Router(); 

const rolesController = new RolesController();

rolesRoutes.use(ensureAuthenticated);
rolesRoutes.use(verifyUserAuthorization([1]));
rolesRoutes.post("/", rolesController.create);

module.exports = rolesRoutes;