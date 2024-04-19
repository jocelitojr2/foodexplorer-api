const { Router } = require('express');

const UsersRolesController = require('../controllers/UsersRolesController');

const usersRolesRoutes = Router(); 

// function myMiddleware(request, response, next) {

//   if (!request.body.isAdmin) {
//     return response.json({ message: "User aunauthorized" });
//   }

//   next();
// }

const usersRolesController = new UsersRolesController();

//userRoleRoutes.post("/", myMiddleware, usersRolesController.create);
usersRolesRoutes.post("/", usersRolesController.create);
usersRolesRoutes.put("/:user_id", usersRolesController.update);
usersRolesRoutes.get("/:user_id", usersRolesController.show);

module.exports = usersRolesRoutes;