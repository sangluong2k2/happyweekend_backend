import User from "../models/users";
import Comment from "../models/comments"

import { createHmac } from "crypto";

export const create = async (req, res) => {
  try {
    const {
      _doc: { password, ...user },
    } = await new User(req.body).save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.find().exec();

    res.json(users);
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).exec();

    res.json(user);
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id }).exec();

    res.json(user);
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...userData } = req.body;
    const user = await User.findOneAndUpdate({ _id: id }, userData, {
      new: true,
    }).exec();

    res.json(user);
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: id }).exec();

    if (!user.isAuthenticate(oldPassword)) {
      res.status(400).json({
        status: false,
        message: "Mật khẩu cũ không chính xác",
      });
      return;
    }

    const passwordHash = createHmac("SHA256", "Happyweekend")
      .update(newPassword)
      .digest("hex");
    await User.findOneAndUpdate({ _id: id }, { password: passwordHash }).exec();

    res.json({
      status: true,
      message: "Cập nhật mật khẩu thành công",
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};
