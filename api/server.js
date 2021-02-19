// BUILD YOUR SERVER HERE
const express = require('express')
const db = require('./users/model')
// import shortid and add to object of newUser?

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
  const userData = req.body

  db.insert(userData)
    .then(newUser => {
      if (newUser) {
        res.status(201).json(newUser)
      } else if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      })
    })
})

server.get('/', (req, res) => {
  
  db.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        message: "The users information could not be retrieved"
      })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The user information could not be retrieved"
      })
    })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The user could not be removed"
      })
    })
})

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params
  const changes = req.body

  db.findById(id)
    .then(user => {
      if (user) {
        db.update(id, changes)
          .then(updatedUser => {
            res.status(200).json(updatedUser)
          })
      } else if (!req.body.name || !req.body.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user"
        })
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist"
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "The user information could not be modified"
      })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
