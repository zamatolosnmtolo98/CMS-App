// Client and Contact Management JavaScript

// Function to open the respective tab content
function openTab(tabName) {
  // Hide all tab contents
  let tabContents = document.querySelectorAll('.tabcontent');
  tabContents.forEach(content => {
      content.style.display = 'none';
  });

  // Show the clicked tab content
  let activeTab = document.getElementById(tabName);
  activeTab.style.display = 'block';

  // Toggle active class on tabs for styling purposes
  let tabButtons = document.querySelectorAll('.tablinks');
  tabButtons.forEach(button => {
      button.classList.remove('active');
  });

  let activeButton = document.querySelector(`[onclick="openTab('${tabName}')"]`);
  activeButton.classList.add('active');
}

// Arrays to store clients and contacts
let clients = [];
let contacts = [];

// Function to add a new client
function addClient() {
  const clientNameInput = document.getElementById('clientNameInput');
  const clientName = clientNameInput.value.trim();

  // Check if client already exists
  if (clients.some(client => client.name.toLowerCase() === clientName.toLowerCase())) {
      document.getElementById('clientMessage').textContent = 'Client already exists!';
      document.getElementById('clientMessage').className = 'red';
      return;
  }

  if (clientName !== '') {
      const clientCode = `C${clients.length + 1}`;
      const newClient = { name: clientName, code: clientCode, contacts: [] };
      clients.push(newClient);

      // Add client to the client list table
      const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
      const newRow = clientsTable.insertRow();
      newRow.insertCell(0).textContent = clientName;
      newRow.insertCell(1).textContent = clientCode;
      newRow.insertCell(2).textContent = '0'; // No linked contacts initially

      // Populate the client selector dropdown in Contacts tab
      const clientSelector = document.getElementById('clientSelector');
      const newOption = document.createElement('option');
      newOption.value = clientCode;
      newOption.textContent = clientName;
      clientSelector.appendChild(newOption);

      // Clear the input field and show success message
      clientNameInput.value = '';
      document.getElementById('clientMessage').textContent = `Client "${clientName}" added successfully!`;
      document.getElementById('clientMessage').className = 'green';
  } else {
      document.getElementById('clientMessage').textContent = 'Please enter a valid client name.';
      document.getElementById('clientMessage').className = 'red';
  }
}

// Function to add a new contact
function addContact() {
  const contactNameInput = document.getElementById('contactNameInput');
  const contactEmailInput = document.getElementById('contactEmailInput');
  const clientSelector = document.getElementById('clientSelector');
  const contactName = contactNameInput.value.trim();
  const contactEmail = contactEmailInput.value.trim();
  const selectedClientCode = clientSelector.value;

  // Check if no clients exist
  if (clients.length === 0) {
      document.getElementById('contactMessage').textContent = 'No clients available. Please add a client first.';
      document.getElementById('contactMessage').className = 'red';
      return;
  }

  if (contactName !== '' && contactEmail !== '' && selectedClientCode !== '') {
      const client = clients.find(client => client.code === selectedClientCode);

      // Check if contact already exists in the selected client's list
      if (client.contacts.some(contact => contact.email === contactEmail)) {
          document.getElementById('contactMessage').textContent = 'This contact already exists for the selected client.';
          document.getElementById('contactMessage').className = 'red';
          return;
      }

      const newContact = { name: contactName, email: contactEmail };
      client.contacts.push(newContact);
      contacts.push(newContact);

      // Add contact to the contact list table
      const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
      const newRow = contactTable.insertRow();
      newRow.insertCell(0).textContent = contactName;
      newRow.insertCell(1).textContent = contactEmail;
      const actionCell = newRow.insertCell(2);
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
          deleteContact(newRow, client, newContact);
      };
      actionCell.appendChild(deleteButton);

      // Update the client row with the new number of linked contacts
      const clientRow = Array.from(document.querySelectorAll('#clientsTable tbody tr')).find(tr => {
          return tr.cells[1].textContent === selectedClientCode;
      });
      clientRow.cells[2].textContent = client.contacts.length;

      // Clear the input fields and show success message
      contactNameInput.value = '';
      contactEmailInput.value = '';
      document.getElementById('contactMessage').textContent = `Contact "${contactName}" added successfully!`;
      document.getElementById('contactMessage').className = 'green';
  } else {
      document.getElementById('contactMessage').textContent = 'Please fill in all contact details.';
      document.getElementById('contactMessage').className = 'red';
  }
}

// Function to delete (unlink) a contact from a client
function deleteContact(row, client, contact) {
  // Check if the client has any contacts
  if (client.contacts.length === 0) {
      document.getElementById('contactMessage').textContent = 'No contacts linked to this client.';
      document.getElementById('contactMessage').className = 'red';
      return;
  }

  // Find the contact in the client's contacts array and remove it
  const index = client.contacts.indexOf(contact);
  if (index > -1) {
      client.contacts.splice(index, 1);
  }

  // Remove the contact from the contact list table
  row.remove();

  // Update the client row with the new number of linked contacts
  const clientRow = Array.from(document.querySelectorAll('#clientsTable tbody tr')).find(tr => {
      return tr.cells[1].textContent === client.code;
  });
  clientRow.cells[2].textContent = client.contacts.length;

  // Show the message for contact unlinking
  document.getElementById('contactMessage').textContent = `Contact "${contact.name}" has been unlinked from client "${client.name}".`;
  document.getElementById('contactMessage').className = 'green';
}
