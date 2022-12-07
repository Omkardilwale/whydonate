const express = require("express");
const router = express.Router();
const {
  createUser,
  checkLogin,
  data12,
} = require("../controllers/Usercontrollers");

//createuser   --
//method-post
router.post("/createuser", createUser);

//login user
router.post("/login", checkLogin);

// router.post("/data12", data12);

module.exports = router;
