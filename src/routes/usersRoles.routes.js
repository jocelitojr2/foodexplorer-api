const { Router } = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const UsersRolesController = require('../controllers/UsersRolesController');
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');

const usersRolesRoutes = Router(); 

const usersRolesController = new UsersRolesController();

usersRolesRoutes.use(ensureAuthenticated);
usersRolesRoutes.use(verifyUserAuthorization([1]));

usersRolesRoutes.post("/", usersRolesController.create);
usersRolesRoutes.put("/:user_id", usersRolesController.update);
usersRolesRoutes.get("/:user_id", usersRolesController.show);

module.exports = usersRolesRoutes;