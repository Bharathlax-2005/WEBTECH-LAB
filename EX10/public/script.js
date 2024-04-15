// Function to load content dynamically
function loadPage(page) {
    fetch(`/${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
            if (page === 'read') {
                fetch('/read')
                    .then(response => response.json())
                    .then(data => displayEmployeeData(data))
                    .catch(error => console.error('Error fetching employee data:', error));
            }
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}


// Function to display employee data in a table
function displayEmployeeData(employees) {
    let tableHtml = '<table border="1">';
    tableHtml += '<tr><th>Name</th><th>Employee ID</th><th>Experience</th><th>Designation</th><th>Company</th><th>Salary</th></tr>';
    employees.forEach(employee => {
        tableHtml += `<tr><td>${employee.name}</td><td>${employee.empid}</td><td>${employee.experience}</td><td>${employee.designation}</td><td>${employee.company}</td><td>${employee.salary}</td></tr>`;
    });
    tableHtml += '</table>';
    document.getElementById('content').innerHTML = tableHtml;
}

// Function to submit the create form
function createEmployee() {
    const form = document.getElementById('createForm');
    const formData = new FormData(form);
    fetch('/create', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display response message
        // Optionally, you can load the read page after successful creation
        loadPage('read');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to submit the update form
function updateEmployee() {
    const form = document.getElementById('updateForm');
    const formData = new FormData(form);
    fetch('/update', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display response message
        // Optionally, you can load the read page after successful update
        loadPage('read');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to submit the delete form
function deleteEmployee() {
    const form = document.getElementById('deleteForm');
    const formData = new FormData(form);
    fetch('/delete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display response message
        // Optionally, you can load the read page after successful deletion
        loadPage('read');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
