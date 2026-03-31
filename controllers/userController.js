const user = require("../models/userModel");

exports.addUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json("user with this email already exist");
    } else {
      const newUser = new user({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: "user added", newUser });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("user not found");
    } else if (existingUser.password !== password) {
      return res.status(400).json("incorrect password");
    } else {
      res.status(200).json({
        message: "login successful",
        existingUser,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    res.status(200).json({ message: "users found", allUsers });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const oneUser = await user.findById(id);
    if (oneUser) {
      res.status(200).json({ message: "user found", oneUser });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const upadtedUser = await user.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true },
    );

    if (!upadtedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user details updated", upadtedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await user.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted" });

  } catch (err) {
    res.status(500).json(err);
  }
};