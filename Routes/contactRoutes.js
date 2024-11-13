// Routes/contactRoutes.js
const express = require('express');
const { getContacts, createContact, unlinkContact } = require('../Controllers/contactControllers');
const { authenticateUser } = require('../middlewares/authMiddleware'); // Authentication middleware
const { validateContactData } = require('../middlewares/validationMiddleware'); // Validation middleware

const router = express.Router();

// Route to get all contacts of a client
router.get('/:clientId', authenticateUser, getContacts); // Ensure only authenticated users can access

// Route to create a new contact
router.post('/', authenticateUser, validateContactData, createContact); // Validate contact data before creating

// Route to unlink (delete) a contact
router.delete('/unlink/:contactId', authenticateUser, unlinkContact); // Ensure only authenticated users can delete

module.exports = router;
