
/*
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app1 = express();

app1.use(helmet());
app1.use(cors());


app1.use('/api', routes);

app1.use(errorHandler);

module.exports = app1;  */



const axios = require('axios');
const express = require('express');
const app = express();
app.use(express.json());

// WhatsApp Business API credentials
const whatsappApiUrl = 'https://api.whatsapp.com/';
const whatsappApiToken = 'aa1207cb5517440f4a205b61';
const businessPhoneNumberId = '1769803550502618';

// Form data endpoint
app.post('/', (req, res) => {
    res.status(200).send({status:'received'})
  const formData = req.body;

  // Prepare WhatsApp message
  const message = {
    messaging_product: 'whatsapp',
    to: '+256740772579', // my WhatsApp number
    type: 'text',
    text: {
      body: `New form submission:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone number: ${formData.phone}\nsevices: ${formData.service}  \nprojectDrescription: ${formData.project-description}:\nUploaded files: ${formData.file-upload} \nbudget: ${formData.budget}:\nTime period: ${formData.timeline} \nterms: ${formData.terms}  `
    },
  };

  // Send WhatsApp message via API
  axios.post(`${whatsappApiUrl}${businessPhoneNumberId}/messages`, message, {
    headers: {
      Authorization: `Bearer ${whatsappApiToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('WhatsApp message sent successfully!');
      res.status(200).send('Form submission received!');
    })
    .catch((error) => {
      console.error('Error sending WhatsApp message:', error);
      res.status(500).send('Error sending WhatsApp message');
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port now at ${port}`);
});


