import mongoose from 'mongoose'

export default async () => {
  if (mongoose.connections[0].readyState) return

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
}