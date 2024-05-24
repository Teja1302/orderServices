const sequelize = require("../config/dbconfig")
const User = require('../model/userModel');
const bcrypt = require('bcrypt')
const createUser = async function (req, res) {
  try {
      console.log("ewfwef")

      let params = req.body;
      createdAt = new Date()
      const checkEmail = await User.findOne({
          where: {
            email:req.body.email
          }, raw: true
      })
      if (checkEmail) {
          res.status(200).json({ message: "email already exist" });
      }
      hashedpassword = await bcrypt.hashSync(req.body.password, 10) //encryption
      params.password = hashedpassword

      const createUSer = await User.create(params).catch((E) => console.log("err", E));
      res.status(201).json(createUSer);

  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ status: 500, error: 'Could not create user', error: error });
  }
}
module.exports = createUser