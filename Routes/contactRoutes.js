// Routes/contactRoutes.js
const express = require('express');
const { getContacts, createContact, unlinkContact } = require('../Controllers/contactControllers');

const router = express.Router();

router.get('/:clientId', getContacts);
router.post('/', createContact);
router.delete('/unlink/:contactId', unlinkContact);

module.exports = router;
