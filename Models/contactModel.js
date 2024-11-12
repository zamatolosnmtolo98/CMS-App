// Models/contactModel.js
const db = require('../config/db');

const createContact = (contactFullName, contactEmail, clientId, callback) => {
  const unlinkUrl = `/api/contacts/unlink/${clientId}`;
  const query = `INSERT INTO contacts (contact_full_name, contact_email, client_id, unlink_url) VALUES (?, ?, ?, ?)`;

  db.query(query, [contactFullName, contactEmail, clientId, unlinkUrl], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getContacts = (clientId, callback) => {
  const query = 'SELECT * FROM contacts WHERE client_id = ?';

  db.query(query, [clientId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const unlinkContact = (contactId, callback) => {
  const query = 'DELETE FROM contacts WHERE contact_id = ?';

  db.query(query, [contactId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { createContact, getContacts, unlinkContact };
