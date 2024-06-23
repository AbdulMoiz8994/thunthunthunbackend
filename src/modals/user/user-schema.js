const mongoose = require("mongoose");
const schemaType = require("../../types");

const userSchema = new mongoose.Schema({
  fullName: {
    type: schemaType.TypeString,
  },
  email: {
    type: schemaType.TypeString,
    unique: true,
  },
  password: {
    type: schemaType.TypeString,
  },
  phoneNumber: {
    type: schemaType.TypeNumber,
  },
  dateofBirth: {
    type: schemaType.TypeString,
  },
  profilePicture:[
    {
        url: {
            type: schemaType.TypeString // Image URL
        },
        id: {
            type: schemaType.TypeString,
            // required: true,
          },
    }
  ],
  address: {
    type: schemaType.TypeString,
  },
  verified: {
    type: schemaType.TypeString,
    enum: ["verified", "unverified"],
    default: "unverified",
  },
  verificationDate: {
    type: schemaType.TypeString,
  },
  visitCount: {
    type: schemaType.TypeNumber,
    default: 0,
  },
  city: { type: schemaType.TypeString },
  state: { type: schemaType.TypeString },
  zipCode: { type: schemaType.TypeString },
  review: {
    type: schemaType.TypeString,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = userSchema;
