const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

router.post('/emailreq', async (req, res) => {
  const { firstName, lastName, domain, phoneNumber, personalEmail } = req.body;

  try {
    const application = new Application({ firstName, lastName, personalEmail, domain, phoneNumber, submit: true });
    await application.save();

    res.status(201).json({ msg: 'Application submitted successfully', application: application }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// All Applications (for Domain Heads)
router.get('/emailreq', async (req, res) => {
  const { personalEmail } = req.query; 
  try {
    if (personalEmail) {
      const applications = await Application.find({ personalEmail: personalEmail });
      res.json(applications);
    } else {
      const applications = await Application.find({});
      res.json(applications);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
