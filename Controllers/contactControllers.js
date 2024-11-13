// Controllers/contactControllers.js
const Contact = require('../Models/contactModel');
const Client = require('../Models/clientModel'); // Assuming Client model is available for client verification

// Get all contacts for a client
const getContacts = (req, res) => {
  const { clientId } = req.params;

  // Check if the client exists before fetching contacts
  Client.getClientById(clientId, (err, client) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    Contact.getContacts(clientId, (err, contacts) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (contacts.length === 0) {
        return res.status(404).json({ message: 'No contacts found for this client' });
      }
      res.json(contacts);
    });
  });
};

// Create a new contact
const createContact = (req, res) => {
  const { contact_full_name, contact_email, client_id } = req.body;

  // Validate if the client exists
  Client.getClientById(client_id, (err, client) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Create the new contact
    Contact.createContact(contact_full_name, contact_email, client_id, (err, result) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      res.status(201).json({ message: 'Contact created', contact: result });
    });
  });
};

// Unlink a contact (set client_id to NULL for the contact)
const unlinkContact = (req, res) => {
  const { contactId } = req.params;

  // Check if the contact exists
  Contact.getContactById(contactId, (err, contact) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Unlink the contact by setting client_id to NULL
    Contact.unlinkContact(contactId, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Contact unlinked successfully' });
    });
  });
};

module.exports = { getContacts, createContact, unlinkContact };
