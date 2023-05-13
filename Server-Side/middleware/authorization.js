const { Report, User } = require("../models");

async function authorization(req, res, next) {
  try {
    // let reportId = req.params.reportId;
    let userId = req.user.id;
    // console.log(userId);

    let user = await User.findByPk(userId);
    if (user.role !== "penindak") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

// async function authorizationForAdmin(req, res, next) {
//   try {
//     let { foodId } = req.params;
//     let userId = req.user.id;
//     // console.log(userId);

//     let user = await User.findByPk(userId);
//     if (user.role == "admin") {
//       let food = await Food.findByPk(foodId);
//       console.log(food);
//       if (!food) {
//         throw { name: "NotFound" };
//       }
//     } else {
//       throw { name: "Forbidden" };
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }

module.exports = { authorization };
