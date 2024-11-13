// Tab switching functionality
function openTab(tabName) {
    const tabContents = document.querySelectorAll(".tabcontent");
    tabContents.forEach(content => {
        content.style.display = "none";
    });

    document.getElementById(tabName).style.display = "block";
}

// Add a client to the database
function addClient() {
    const clientName = document.getElementById("clientNameInput").value.trim();

    if (clientName === "") {
        alert("Please enter a client name.");
        return;
    }

    // Send the client data to the backend
    fetch('/add-client', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Client added successfully!');
            loadClients(); // Reload the client list
        } else {
            alert('Error adding client.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Error adding client.');
    });
}

// Load clients into the table
function loadClients() {
    fetch('/get-clients')
    .then(response => response.json())
    .then(data => {
        const clientsTable = document.getElementById("clientsTable").getElementsByTagName('tbody')[0];
        clientsTable.innerHTML = ""; // Clear existing rows

        data.clients.forEach(client => {
            const row = clientsTable.insertRow();
            row.innerHTML = `
                <td>${client.name}</td>
                <td>${client.client_code}</td>
                <td style="text-align: center;">${client.linked_contacts}</td>
            `;
        });

        // Populate the client selector dropdown for contacts
        const clientSelector = document.getElementById("clientSelector");
        clientSelector.innerHTML = ''; // Clear existing options
        data.clients.forEach(client => {
            const option = document.createElement("option");
            option.value = client.id;
            option.textContent = client.name;
            clientSelector.appendChild(option);
        });
    })
    .catch(err => console.error('Error loading clients:', err));
}

// Add a contact to the selected client
function addContact() {
    const contactName = document.getElementById("contactNameInput").value.trim();
    const contactEmail = document.getElementById("contactEmailInput").value.trim();
    const clientId = document.getElementById("clientSelector").value;

    if (contactName === "" || contactEmail === "") {
        alert("Please enter a valid contact name and email.");
        return;
    }

    // Send the contact data to the backend
    fetch('/add-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactName, contactEmail, clientId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Contact added successfully!');
            loadContacts(); // Reload the contact list
        } else {
            alert('Error adding contact.');
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Error adding contact.');
    });
}

// Load contacts into the table
function loadContacts() {
    fetch('/get-contacts')
    .then(response => response.json())
    .then(data => {
        const contactTable = document.getElementById("contactTable").getElementsByTagName('tbody')[0];
        contactTable.innerHTML = ""; // Clear existing rows

        data.contacts.forEach(contact => {
            const row = contactTable.insertRow();
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td><a href="#" onclick="unlinkContact(${contact.id})">Unlink</a></td>
            `;
        });
    })
    .catch(err => console.error('Error loading contacts:', err));
}

// Unlink a contact from a client
function unlinkContact(contactId) {
    fetch(`/unlink-contact/${contactId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Contact unlinked successfully!');
            loadContacts(); // Reload the contact list
        } else {
            alert('Error unlinking contact.');
        }
    })
    .catch(err => console.error('Error unlinking contact:', err));
}

// Load data when the page loads
window.onload = () => {
    loadClients();
    loadContacts();
};
