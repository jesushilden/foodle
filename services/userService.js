import bcrypt from 'bcrypt'
import User from '../models/User'

const getAll = async () => {
  return await User.find({})
}

const getOne = async (id) => {
  if (!id) {
    throw new Error('Please provide a valid id.')
  }
  
  return await User.findById(id)
}

const getOneByEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email })

  const passwordCorrect = user ?
    await bcrypt.compare(password, user.password)
    :
    false

  if (!passwordCorrect) {
    throw new Error('Invalid email or password.')
  }

  return user
}

const create = async (userObject) => {
  const existingUser = await User.findOne({ email: userObject.email })

  if (existingUser) {
    throw new Error('The email is already in use.')
  }

  const passwordHash = await bcrypt.hash(userObject.password, 10)

  const user = new User({
    name: userObject.name,
    email: userObject.email,
    password: passwordHash,
    iban: userObject.iban,
    card: userObject.card
  })

  return await user.save()
}

const updateOne = async (id, userObject) => {

  const updateObject = {
    name: userObject.name,
    email: userObject.email,
    iban: userObject.iban,
    card: userObject.card
  }

  return await User.findByIdAndUpdate(id, updateObject, { new: true, runValidators: true })
}

const deleteOne = async (id) => {
  await User.findByIdAndDelete(id)
}

export default {
  getAll,
  getOne,
  getOneByEmailAndPassword,
  create,
  updateOne,
  deleteOne
}