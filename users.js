const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { firstName, lastName, phoneNumber, personalEmail, domain, password } = req.body;

  if (!firstName || !lastName || !phoneNumber || !personalEmail || !domain || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    let existingUser = await User.findOne({ personalEmail });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    let accessLevel = personalEmail === 'geethika.bodapati@gmail.com' ? 'Domain Head' : 'Employee';

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      personalEmail,
      domain,
      password,
      accessLevel 
    });

    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let accessLevel = 'Employee'; 
    if (email === 'geethika.bodapati@gmail.com') {
      accessLevel = 'DomainHead';
      res.send({ user: { accessLevel: accessLevel } });
    } else if (await User.findOne({ personalEmail: email })) { 
      console.log("Login successful");
      res.send({ user: { accessLevel: accessLevel } });
    } else {
      res.status(400).send({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Getting user data for domain head verification
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ domain: req.body.domain }); 
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
