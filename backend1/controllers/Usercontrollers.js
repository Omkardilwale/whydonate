const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "bydonate";

//creating user
const createUser = async (req, res) => {
  try {
    //checking wheather user is there or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      const newUserInfo = {
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      };

      const newuser = await User.create(newUserInfo);
      const data = {
        user: {
          id: newuser.id,
        },
      };

      console.log(newuser);
      const authtoken = jwt.sign(data, JWT_SECRET);
      const success = true;
      res.json({ success, authtoken, name: req.body.name });
    }

    //creating new user
    else {
      res.status(400).json({ error: "sorry this user alredy rigistered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

const checkLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    let success = false;
    console.log(user);
    if (!user) {
      return res.status(200).json({
        success,
        error: "try to login with correct credintials",
      });
    }

    const password_compare_res = await bcrypt.compare(password, user.password);

    if (!password_compare_res) {
      return res.json({ success, error: "wrong password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;
    console.log(authtoken);
    res.json({ success, authtoken, name: req.body.name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error while login" });
  }
};

// const data12 = () => {
//   var url = "https://www.reddit.com/r/popular.json";
//   let settings = { method: "Get" };
//   fetch(url, settings)
//     .then((res) => res.json())
//     .then((json) => {
//       // do something with JSON
//     });
// };
module.exports = { createUser, checkLogin };
