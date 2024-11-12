// Models/clientModel.js
const db = require('../config/db');

const createClient = (clientName, callback) => {
  const clientCode = `${clientName.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 1000)}`;
  const query = `INSERT INTO clients (client_name, client_code) VALUES (?, ?)`;

  db.query(query, [clientName, clientCode], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getClients = (callback) => {
  const query = 'SELECT * FROM clients';

  db.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const deleteClient = (clientId, callback) => {
  const query = 'DELETE FROM clients WHERE client_id = ?';

  db.query(query, [clientId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = { createClient, getClients, deleteClient };
