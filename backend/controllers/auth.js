const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// @desc Register User
// @route POST /api/v1/auth/register
// @access Public

exports.register = (req, res, next) => {
  const { email, firstname, password, lastname } = req.body;
  // create User
  User.create({
    firstname,
    lastname,
    email,
    password,
  })
    .then((user) =>
      res
        .status(200)
        .json({ success: true, data: "User Created Successfully!" })
    )
    .catch((err) => next(err));
};

// @desc Login User
// @route POST /api/v1/auth/login
// @access Public

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new errorResponse("Please provided email and password", 400));
  }
  // check if user exist, since we did password select = false in models we wont get password in findOne so thats why we use .select(+password)
  User.findOne({ email: email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(
          new errorResponse(
            "Cant find the User with given email and password",
            400
          )
        );
      }
      // check is password is match
      user
        .matchPassword(password)
        .then((isMatch) => {
          if (!isMatch) {
            return next(
              new errorResponse(
                "Cant find the User with given email and password",
                400
              )
            );
          }
          // create token

          // now this token can be used in frontend in localstorage
          sendTokenResponse(user, 200, res);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// @desc Gets the current logged in User
// @route GET /api/v1/auth/me
// @access Private
exports.getMe = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.status(200).json({ success: true, data: user }))
    .catch((err) => next(err));
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  // here we attach cookie in our response
  res.status(statusCode).json({ success: true, token });
};
