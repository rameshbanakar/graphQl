import { users, quotes } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";


const User = mongoose.model("User");
const Quote = mongoose.model("Quote");
const resolver = {
  Query: {
    users: async () => await User.find(),
    user: async (params, { _id }) => await User.findOne({ _id }),
    quotes: async () => await Quote.find().populate("by", "_id firstName"),
    iquotes: async (params, { by }) => await Quote.find({ by }),
    myProfile: async (params, args, { userId }) => {
      if (!userId) {
        throw new Error("you must log in");
      }
      return await User.findOne({_id:userId})
    },
  },
  user: {
    quotes: async (ur) => await Quote.find({ by: ur._id }),
  },
  Mutation: {
    signUpUser: async (params, { newUser }) => {
      const user = await User.findOne({ email: newUser.email });
      if (user) {
        throw new Error("user alredy exists");
      }
      const hashpassword = await bcrypt.hash(newUser.password, 12);
      const userNew = new User({
        ...newUser,
        password: hashpassword,
      });
      return await userNew.save();
    },
    signInUser: async (params, { userSign }) => {
      const user = await User.findOne({ email: userSign.email });
      if (!user) {
        throw new Error("User Not Found");
      }
      const isMatch = await bcrypt.compare(userSign.password, user.password);
      if (!isMatch) {
        throw new Error("Creditials are not correct");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },
    createQuote: async (params, { name }, { userId }) => {
      if (!userId) throw new Error("you must log in");
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote saved successfully";
    },
  },
};
export default resolver;
