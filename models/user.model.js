import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    required: [true, "First Name Is Required!"],
  },
  lastName: {
    type: String,
    minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    required: true
  },
  phone: {
    type: String,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ['Male', 'Female', 'Other']
  },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  nic: {
    type: String,
    required: [true, "NIC Is Required!"],
    minLength: [13, "NIC Must Contain Only 13 Digits!"],
    maxLength: [13, "NIC Must Contain Only 13 Digits!"],
  },
  password: {
    type: String,
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
    required: true
  },
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Admin"],
    required: [true, "User Role Required!"]
  },
  doctorDepartment: {
    type: String
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  }
});

// now code to be password modification or hashing]
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

  userSchema.methods.comparePassword = async function (enteredPassword) 
  {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

export const User = mongoose.model("User", userSchema);
