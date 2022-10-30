import { expressjwt } from "express-jwt";
import User from "../models/users";

export const requireSignin = expressjwt({
  algorithms: ["HS256"],
  secret: "Happyweekend",
  requestProperty: "auth",
});

export const isAuth = async (req, res, next) => {
  try {
    const { email } = req.auth;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(404).json({
        message: "Bạn không có quyền truy cập",
      });
      return;
    }

    req.profile = user;
    next();
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  const role = req.profile.role;

  if (role !== 1) {
    res.status(403).json({
      message: "Bạn không có quyền truy cập",
    });

    return;
  }

  next();
};
