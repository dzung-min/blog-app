const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator').default

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Name must contains at least 2 characters'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: 'Email is required',
      validate: (val) => {
        if (!validator.isEmail(val)) {
          throw new Error('Invalid email address')
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: 'Password is required',
      minlength: [8, 'Password must contains at least 8 characters'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 12)
  }
})

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model('User', UserSchema)
