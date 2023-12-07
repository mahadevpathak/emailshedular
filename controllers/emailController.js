const Email = require('../models/Email');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailController = {
  create: async (req, res) => {
    try {
      const { to, subject, body, scheduledTime } = req.body;
      const email = new Email({ to, subject, body, scheduledTime });
      await email.save();

      res.status(201).json({ message: 'Email scheduled successfully', email });

      
      // sendEmail(email);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  readAll: async (req, res) => {
    try {
      const emails = await Email.find();
      res.status(200).json(emails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { scheduledTime } = req.body;

      const email = await Email.findByIdAndUpdate(id, { scheduledTime }, { new: true });

      res.status(200).json({ message: 'Email rescheduled successfully', email });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Email.findByIdAndRemove(id);
      res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};


const sendEmail = async (email) => {
  try {
    const msg = {
      to: email.to,
      from: 'mayur.pathak1545@gmail.com', 
      subject: email.subject,
      text: email.body,
    };

    await sgMail.send(msg);
    console.log('Email sent:', msg);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = emailController;
