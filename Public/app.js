// Client and Contact Data storage
let clients = [];
let contacts = [];

// Tab switching functionality
function openTab(tabName) {
  const tabContents = document.querySelectorAll(".tabcontent");
  tabContents.forEach((content) => {
    content.style.display = "none";
  });
  document.getElementById(tabName).style.display = "block";
}

// Add a client to the database
function addClient() {
  const clientName = document.getElementById("clientNameInput").value.trim();

  if (clientName === "") {
    showMessage("clientMessage", "Client name is required!", "red");
    return;
  }

  fetch("/add-client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clientName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showMessage("clientMessage", "Client added successfully!", "green");
        loadClients(); // Reload the client list
      } else {
        showMessage("clientMessage", "Error adding client.", "red");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      showMessage("clientMessage", "Error adding client.", "red");
    });
}

// Load clients into the table and update client selector dropdown
function loadClients() {
  fetch("/get-clients")
    .then((response) => response.json())
    .then((data) => {
      const clientsTable = document
        .getElementById("clientsTable")
        .getElementsByTagName("tbody")[0];
      clientsTable.innerHTML = ""; // Clear existing rows

      const clientSelector = document.getElementById("clientSelector");
      clientSelector.innerHTML = ""; // Clear existing options

      if (data.clients.length === 0) {
        // Show message if no clients are found
        const row = clientsTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3; // Span across all columns
        cell.textContent = "No clients found.";
        cell.style.textAlign = "center";
      } else {
        // Populate client table and client selector dropdown
        data.clients.forEach((client) => {
          // Populate client table
          const row = clientsTable.insertRow();
          row.innerHTML = `
                    <td>${client.name}</td>
                    <td>${client.client_code}</td>
                    <td>${client.linked_contacts}</td>
                `;

          // Populate client selector dropdown
          const option = document.createElement("option");
          option.value = client.id;
          option.textContent = client.name;
          clientSelector.appendChild(option);
        });
      }
    })
    .catch((err) => console.error("Error loading clients:", err));
}

// Add a contact to the selected client
function addContact() {
  const contactName = document.getElementById("contactNameInput").value.trim();
  const contactEmail = document
    .getElementById("contactEmailInput")
    .value.trim();
  const clientId = document.getElementById("clientSelector").value;

  if (contactName === "" || contactEmail === "") {
    showMessage("contactMessage", "All fields are required!", "red");
    return;
  }

  fetch("/add-contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactName, contactEmail, clientId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showMessage("contactMessage", "Contact added successfully!", "green");
        loadContacts(); // Reload the contact list
      } else {
        showMessage("contactMessage", "Error adding contact.", "red");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      showMessage("contactMessage", "Error adding contact.", "red");
    });
}

// Load contacts into the table
function loadContacts() {
  fetch("/get-contacts")
    .then((response) => response.json())
    .then((data) => {
      const contactTable = document
        .getElementById("contactTable")
        .getElementsByTagName("tbody")[0];
      contactTable.innerHTML = ""; // Clear existing rows

      if (data.contacts.length === 0) {
        // Show message if no contacts are found
        const row = contactTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3; // Span across all columns
        cell.textContent = "No contacts found.";
        cell.style.textAlign = "center";
      } else {
        // Populate contact table
        data.contacts.forEach((contact) => {
          const row = contactTable.insertRow();
          row.innerHTML = `
                    <td>${contact.name}</td>
                    <td>${contact.email}</td>
                    <td><a href="#" onclick="unlinkContact(${contact.id})">Unlink</a></td>
                `;
        });
      }
    })
    .catch((err) => console.error("Error loading contacts:", err));
}

// Unlink a contact from a client
function unlinkContact(contactId) {
  fetch(`/unlink-contact/${contactId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        showMessage("contactMessage", "Contact removed successfully!", "green");
        loadContacts(); // Reload the contact list
      } else {
        showMessage("contactMessage", "Error removing contact.", "red");
      }
    })
    .catch((err) => console.error("Error removing contact:", err));
}

// Show Message function (for success/error messages)
function showMessage(elementId, message, color) {
  const messageDiv = document.getElementById(elementId);
  messageDiv.style.color = color;
  messageDiv.textContent = message;
  setTimeout(() => {
    messageDiv.textContent = ""; // Clear message after a short delay
  }, 3000);
}

// Load data when the page loads
window.onload = () => {
  loadClients();
  loadContacts();
};
