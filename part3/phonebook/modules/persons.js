const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose
  .connect(url, { family: 4 })
  .then(() => {
    console.log('connected to db')
  })
  .catch((error) => {
    console.log('error connection to db', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength:3,
    required:true
  },
  number: {
    type: String,
    minLength:8,
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{6,}/.test(v)
      }
    }
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', phonebookSchema)
