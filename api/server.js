// BUILD YOUR SERVER HERE
const express = require('express')
const db = require('./model')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
  const newUser = db.insert({
    name: req.body.name,
    bio: req.body.bio
  })

  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      message: "Please provide name and bio for the user"
    })
  } else {
    res.status(201).json(newUser)
  }
})

server.get('/api/users', (req, res) => {
  const users = db.find()
  res.json(users)
})

server.get('/api/users/:id', (req, res) => {
  const user = db.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
  }
})

server.delete('/api/users/:id', (req, res) => {
  const user = db.findById(req.params.id)

  if (user) {
    db.remove(user.id)

    res.status(204).json(user)
  }
})

server.put("/api/users/:id", (req, res) => {
  const user = db.findById(req.params.id)

  if (user) {
    const updatedUser = db.update(user.id, {
      name: req.body.name,
      bio: req.body.bio
    })
    res.json(updatedUser)
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
