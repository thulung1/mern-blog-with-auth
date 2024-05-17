const mongoose = require("mongoose");
const z = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");

const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const createUser = async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Wrong inputs!",
    });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(411).json({
        message: "User already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const signinUser = async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Wrong inputs",
    });
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(411).json({
        message: "User doesn't exists",
      });
    }
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      return res.status(411).json({
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...info } = user._doc;
    return res.status(200).json({
      message: "User successfully logged in",
      info,
      token
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refetchUser = (req, res) => {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json("Token not found")
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({
        err,
        message: "Token is not valid"
    });
    }
    return res.status(200).json(data);
  });
};

const logoutUser = (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .send({
        message: "User logged out successfully",
      });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  signinUser,
  refetchUser,
  logoutUser,
};
