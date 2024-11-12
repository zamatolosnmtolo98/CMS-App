// server.js
const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./Routes/clientRoutes');
const contactRoutes = require('./Routes/contactRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('Public'));

// Routes
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
