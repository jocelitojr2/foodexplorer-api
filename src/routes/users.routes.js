const { Router } = require('express');

const UsersController = require('../controllers/UsersController');

const usersRoutes = Router(); 

function myMiddleware(request, response, next) {
  
  if (!request.body.isAdmin) {
    return response.json({ message: "User aunauthorized" });
  }

  next();
}

const usersController = new UsersController();

usersRoutes.post("/", myMiddleware, usersController.create);

module.exports = usersRoutes;