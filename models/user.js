import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "please enter the first name"],
  },
  lastName: {
    type: String,
    require: [true, "please enter the last name"],
  },
  email: {
    type: String,
    require: [true, "please enter the email"],
  },
  password: {
    type: String,
    require: [true, "please enter the password"],
  }
});
mongoose.model("User",userSchema)

