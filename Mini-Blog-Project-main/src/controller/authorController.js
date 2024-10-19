const jwt = require("jsonwebtoken");       //import jsonwebtoken 
const authorModel = require("../models/authorModel");          //import authorModel

// Solution-1) Create author by post request

const createAuthor = async (req, res) =>{     //Arrow allow you to create function in a cleaner way,compared to regular functions.
  try {                                         
    let author = req.body;
    let email = req.body.email;

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "Email id required" });
    }

    let author1 = await authorModel.create(author);
    return res.status(201).send({ status: true, message: author1 });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

// Solution-2) By using post request we make a loginUser with jwt

const loginUser = async  (req, res)=> {      //Arrow allow you to create function in a cleaner way,compared to regular functions.
  try {
    let authorName = req.body.email;
    let password = req.body.password;

    let author = await authorModel.findOne({
      email: authorName,
      password: password,
    });
    if (!author)
      return res.status(403).send({
        status: false,
        msg: "Invalid Username and Password",
      });

    let token = jwt.sign(      //It's a method to generate token
      {
        authorId: author._id,

      },
      "Secret-key"
    );
    res.setHeader("x-api-key", token);       //set header with name (x-api-key)
    res.status(200).send({ status: true, data: token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.createAuthor = createAuthor;            //export both createAuthor and Login controller because we use that outside of file.
module.exports.loginUser = loginUser;
