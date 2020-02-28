// imports
const Users = require('./auth-model.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// bring in the secret
const { jwtSecret } = require('../config/secrets.js')
// create the router
const router = require('express').Router();

// endpoints
router.post('/register', (req, res) => {
  // implement registration
  const newUser = req.body

  const hash = bcrypt.hashSync(newUser.password, 8)
  newUser.password = hash

  if (newUser && newUser.username && newUser.password) {
    Users.add(newUser)
      .then((user) => {
        res.status(201).json({message:"Registered!"})
      })
      .catch(({name, message, stack}) => {
        // console.log('Testing error in register:', newUser)
        res.status(500).json({name:name, message:message, stack:stack})
      })
  } else {
    res.status(400).json({message:"Please provide a username and a password."})
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        token = generateToken(user)
        console.log("This is the response object at login:", user)
        res.status(200).json({message:`Welcome, ${user.username}!`, token})
      } else {
        res.status(401).json({ message:"You're username or password are incorrect." })
      }
    })
    .catch(({name, message, stack}) =>  {
      res.status(500).json({name:name, message:message, stack:stack})
    })
});

// local middleware for token generation
function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
