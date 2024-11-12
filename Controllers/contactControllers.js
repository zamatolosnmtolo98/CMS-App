// Controllers/contactControllers.js
const Contact = require('../Models/contactModel');

// Get all contacts for a client
const getContacts = (req, res) => {
  const { clientId } = req.params;

  Contact.getContacts(clientId, (err, contacts) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(contacts);
    }
  });
};

// Create a new contact
const createContact = (req, res) => {
  const { contact_full_name, contact_email, client_id } = req.body;

  Contact.createContact(contact_full_name, contact_email, client_id, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(201).json({ message: 'Contact created', contact: result });
    }
  });
};

// Unlink a contact
const unlinkContact = (req, res) => {
  const { contactId } = req.params;

  Contact.unlinkContact(contactId, (err, result) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json({ message: 'Contact unlinked' });
    }
  });
};

module.exports = { getContacts, createContact, unlinkContact };
