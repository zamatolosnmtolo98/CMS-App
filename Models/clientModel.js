class Client {
  constructor(name) {
    this.name = name;
    this.code = ''; // This will be generated automatically
    this.contacts = [];
  }

  // Generate a unique client code
  generateClientCode() {
    const words = this.name.split(' ').map(word => word.toUpperCase().slice(0, 3)); // Get first three characters of each word
    const initials = words.join('').slice(0, 3); // Limit to the first three initials

    // Query for last used number for this client's initials (Assume it's done elsewhere, here just mock the number generation)
    let lastNumber = 0; // Normally, fetch this from a database or in-memory storage
    const nextNumber = (lastNumber + 1).toString().padStart(3, '0'); // Format number as 3 digits

    this.code = `${initials}${nextNumber}`;
  }

  // Add a contact to the client
  addContact(contact) {
    this.contacts.push(contact);
  }

  // Remove a contact from the client
  removeContact(contactEmail) {
    this.contacts = this.contacts.filter(contact => contact.email !== contactEmail);
  }

  // Get number of contacts
  getContactsCount() {
    return this.contacts.length;
  }
}

class Contact {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class ClientContactManager {
  constructor() {
    this.clients = [];
    this.contacts = [];
  }

  // Add a new client
  addClient(clientName) {
    // Check if client already exists
    if (this.clients.some(client => client.name.toLowerCase() === clientName.toLowerCase())) {
      this.showMessage('Client already exists!', 'red');
      return;
    }

    const newClient = new Client(clientName);
    newClient.generateClientCode(); // Generate the client code when the client is created
    this.clients.push(newClient);
    this.updateClientTable(newClient);
    this.showMessage(`Client "${clientName}" added successfully!`, 'green');
  }

  // Add a new contact to a client
  addContact(contactName, contactEmail, clientCode) {
    const client = this.clients.find(client => client.code === clientCode);
    if (!client) {
      this.showMessage('Client not found!', 'red');
      return;
    }

    // Check if contact already exists
    if (client.contacts.some(contact => contact.email === contactEmail)) {
      this.showMessage('This contact already exists for the selected client.', 'red');
      return;
    }

    const newContact = new Contact(contactName, contactEmail);
    client.addContact(newContact);
    this.contacts.push(newContact);

    this.updateContactTable(client);
    this.showMessage(`Contact "${contactName}" added successfully!`, 'green');
  }

  // Remove a contact from a client
  removeContact(clientCode, contactEmail) {
    const client = this.clients.find(client => client.code === clientCode);
    if (!client) {
      this.showMessage('Client not found!', 'red');
      return;
    }

    client.removeContact(contactEmail);
    this.updateContactTable(client);
    this.showMessage(`Contact with email "${contactEmail}" removed from client "${client.name}".`, 'green');
  }

  // Update the client table (DOM)
  updateClientTable(newClient) {
    const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    const newRow = clientsTable.insertRow();
    newRow.insertCell(0).textContent = newClient.name;
    newRow.insertCell(1).textContent = newClient.code;
    newRow.insertCell(2).textContent = newClient.getContactsCount();
  }

  // Update the contact table (DOM)
  updateContactTable(client) {
    const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    contactTable.innerHTML = ''; // Clear the table before updating
    client.contacts.forEach(contact => {
      const newRow = contactTable.insertRow();
      newRow.insertCell(0).textContent = contact.name;
      newRow.insertCell(1).textContent = contact.email;
      const actionCell = newRow.insertCell(2);
      const unlinkButton = document.createElement('button');
      unlinkButton.textContent = 'Unlink';
      unlinkButton.onclick = () => this.removeContact(client.code, contact.email);
      actionCell.appendChild(unlinkButton);
    });
  }

  // Show message in the DOM
  showMessage(message, color) {
    const messageElement = document.getElementById('clientMessage');
    messageElement.textContent = message;
    messageElement.className = color;
  }
}

// Instantiate the ClientContactManager
const manager = new ClientContactManager();

// Event Listeners
document.getElementById('addClientButton').addEventListener('click', () => {
  const clientName = document.getElementById('clientNameInput').value.trim();
  manager.addClient(clientName);
});

document.getElementById('addContactButton').addEventListener('click', () => {
  const contactName = document.getElementById('contactNameInput').value.trim();
  const contactEmail = document.getElementById('contactEmailInput').value.trim();
  const selectedClientCode = document.getElementById('clientSelector').value;
  manager.addContact(contactName, contactEmail, selectedClientCode);
});
