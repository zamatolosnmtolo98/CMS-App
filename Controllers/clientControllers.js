// Controllers/clientControllers.js
const Client = require('../Models/clientModel');

// Get all clients
const getClients = (req, res) => {
  Client.getClients((err, clients) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(clients);
    }
  });
};

// Create a new client
const createClient = (req, res) => {
  const { client_name } = req.body;

  Client.createClient(client_name, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(201).json({ message: 'Client created', client: result });
    }
  });
};

// Delete a client
const deleteClient = (req, res) => {
  const { id } = req.params;

  Client.deleteClient(id, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Client deleted' });
    }
  });
};

module.exports = { getClients, createClient, deleteClient };
