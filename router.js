const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const { Model: User } = require("./models/User");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.get("/database", (req, res) => {
    User.findAll({ attributes: ["id", "email", "password"] })
      .then(users => {
        res.json({ msg: "Users returned", users: users });
      })
      .catch(err => res.json({ status: 500, msg: err }));
  });

  // test route for server
  app.get("/", requireAuth, (req, res) => {
    res.send(["apple", "pen", "coffe cup"]);
  });

  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
};
