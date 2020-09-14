import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this user.'],
    maxlength: [60, 'Name cannot be more than 60 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email for this user.'],
    maxlength: [320, 'Email cannot be more than 320 characters.']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for this user.'],
    maxlength: [320, 'Password cannot be more than 320 characters.']
  },
  iban: {
    type: String,
    maxlength: [34, 'IBAN cannot be more than 34 characters.']
  },
  card: {
    type: String, 
    maxlength: [320, 'Card cannot be more than 320 characters.']
  }
})

UserSchema.statics.format = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  iban: user.iban,
  card: user.card
})

export default mongoose.models.User || mongoose.model('User', UserSchema)