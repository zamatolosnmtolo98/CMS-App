// Models/contactModel.js
const db = require('../config/db');

// Create a contact
const createContact = async (contactFullName, contactEmail, clientId) => {
  const unlinkUrl = `/api/contacts/unlink/${clientId}`;
  const query = 'INSERT INTO contacts (contact_full_name, contact_email, client_id, unlink_url) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await db.promise().query(query, [contactFullName, contactEmail, clientId, unlinkUrl]);
    return result;
  } catch (err) {
    throw err; // Re-throw the error to be caught by the controller
  }
};

// Get contacts for a specific client
const getContacts = async (clientId) => {
  const query = 'SELECT * FROM contacts WHERE client_id = ?';

  try {
    const [results] = await db.promise().query(query, [clientId]);
    return results;
  } catch (err) {
    throw err;
  }
};

// Unlink (delete) a contact
const unlinkContact = async (contactId) => {
  const query = 'DELETE FROM contacts WHERE contact_id = ?';

  try {
    const [result] = await db.promise().query(query, [contactId]);
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = { createContact, getContacts, unlinkContact };
