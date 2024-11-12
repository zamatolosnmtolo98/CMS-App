// Routes/clientRoutes.js
const express = require('express');
const { getClients, createClient, deleteClient } = require('../Controllers/clientControllers');

const router = express.Router();

router.get('/', getClients);
router.post('/', createClient);
router.delete('/:id', deleteClient);

module.exports = router;
