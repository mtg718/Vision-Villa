import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImagePath: {
    type: String,
    required: [true, "Profile image is required"],
  },
  wishlist: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  work: {     // works here
    type: Array,
    default: [],
  },
});

//if user exist or not , if not create a new user by userschema
const User = models.User || model("User", UserSchema)

export default User;