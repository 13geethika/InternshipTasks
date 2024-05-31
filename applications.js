const express = require('express');
const Application = require('../models/Application');
const User = require('../models/User');

const router = express.Router();

// Submit Application
router.post('/emailreq', async (req, res) => {
  const { firstName, lastName, domain, phoneNumber } = req.body;

  try {
    // Create a new application with the provided data
    const newApplication = new Application({ firstName, lastName, domain, phoneNumber });
    await newApplication.save();

    res.status(201).json({ msg: 'Application submitted successfully', application: newApplication });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get All Applications (for Domain Heads)
router.get('/emailreq', async (req, res) => {
    try {
      const applications = await Application.find({});
      res.json(applications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Verify or Decline Application
router.put('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    await Application.findByIdAndUpdate(req.params.id, { status });
    res.json({ msg: 'Application status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
