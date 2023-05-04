const { decodedToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      // dia harus ngirim token
      throw { name: "UnAuthentication" };
    }
    let payload = decodedToken(access_token);
    // console.log(payload, ",,,,,,,,,,payload");

    // cek apakah data yg didalam payload itu exists
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "UnAuthentication" }; // lempar error ketika user tdk ada
    }

    // hanya berlaku 1x request
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

// async function authenticationForCustomer(req, res, next) {
//   try {
//     let { access_token } = req.headers;

//     if (!access_token) {
//       // dia harus ngirim token
//       throw { name: "UnAuthentication" };
//     }
//     let payload = decodedToken(access_token);
//     // console.log(payload, ",,,,,,,,,,payload");

//     // cek apakah data yg didalam payload itu exists
//     const customer = await Customer.findByPk(payload.id);
//     if (!customer) {
//       throw { name: "UnAuthentication" }; // lempar error ketika user tdk ada
//     }

//     // hanya berlaku 1x request
//     req.user = {
//       id: customer.id,
//       role: customer.role,
//       email: customer.email,
//     };
//     next();
//   } catch (error) {
//     // console.log(error);
//     next(error);
//   }
// }

module.exports = { authentication };
