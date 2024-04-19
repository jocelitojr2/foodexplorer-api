const { Router } = require('express');

const RolesController = require('../controllers/RolesController');

const rolesRoutes = Router(); 

// function myMiddleware(request, response, next) {

//   if (!request.body.isAdmin) {
//     return response.json({ message: "User aunauthorized" });
//   }

//   next();
// }

const rolesController = new RolesController();

//rolesRoutes.post("/", myMiddleware, rolesController.create);
rolesRoutes.post("/", rolesController.create);

module.exports = rolesRoutes;