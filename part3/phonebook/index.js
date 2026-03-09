const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./modules/persons')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
morgan.token('data', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data'),
)
app.use(express.static('dist'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.get('/api/info', (req, res, next) => {
  const date = new Date().toString()
  Person.find({})
    .then((persons) => {
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p> <br/> ${date}`,
      )
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).send({ error: 'please provide name and number' })
  }
  try {
    const existingPerson = await Person.findOne({ name: name })
    if (existingPerson) {
      return res.status(400).send({ error: 'name must be unique' })
    }
    const person = new Person({
      name: name,
      number: number,
    })
    const savedPerson = await person.save()
    res.json(savedPerson)
  } catch (error) {
    next(error)
  }
})
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        res.status(404).end()
      }
      person.name = name
      person.number = number
      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})
const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log('server running on port', port)
})
