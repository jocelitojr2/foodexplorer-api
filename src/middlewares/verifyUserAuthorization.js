const AppError = require("../utils/AppError");

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { userPermission } = request.user;

    if ( !roleToVerify.includes(userPermission.role_id) ) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  }
}

module.exports = verifyUserAuthorization;