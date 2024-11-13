const express = require('express');
const { getClients, createClient, deleteClient } = require('../Controllers/clientControllers');
const { validateClientData } = require('../middlewares/validationMiddleware'); // Example of validation middleware
const { authenticateUser } = require('../middlewares/authMiddleware'); // Example of authentication middleware

const router = express.Router();

// Route to get all clients
router.get('/', authenticateUser, getClients); // Protected route, user must be authenticated

// Route to create a new client
router.post('/', authenticateUser, validateClientData, createClient); // Validates data before creating a client

// Route to delete a client by id
router.delete('/:id', authenticateUser, deleteClient); // Protected route

module.exports = router;
