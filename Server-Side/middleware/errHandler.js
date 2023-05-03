const errHandler = (error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message = "Internal Server Error";

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "InvalidData":
      status = 400;
      message = "Email or Password is Required";
      break;
    case "InvalidLogin":
      status = 400;
      message = "Incorrect Email or Password";
      break;
    case "UnAuthentication":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "NotFound":
      status = 404;
      message = "Not Found";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
  }
  res.status(status).json({ message: message });
};

module.exports = errHandler;
