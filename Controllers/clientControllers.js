// Controllers/clientControllers.js
const Client = require('../Models/clientModel');

// Get all clients
const getClients = (req, res) => {
  Client.getClients((err, clients) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (clients.length === 0) {
      return res.status(404).json({ message: 'No clients found' });
    }
    res.json(clients);
  });
};

// Create a new client
const createClient = (req, res) => {
  const { client_name } = req.body;

  // Check if client already exists
  Client.getClientByName(client_name, (err, existingClient) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (existingClient) {
      return res.status(400).json({ message: 'Client already exists' });
    }

    Client.createClient(client_name, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ message: 'Client created', client: result });
    });
  });
};

// Delete a client
const deleteClient = (req, res) => {
  const { id } = req.params;

  // Check if client exists before deleting
  Client.getClientById(id, (err, client) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    Client.deleteClient(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Client deleted' });
    });
  });
};

module.exports = { getClients, createClient, deleteClient };
