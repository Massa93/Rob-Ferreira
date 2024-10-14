// script.js
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const dashboardLink = document.getElementById('dashboard-link');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    const patientList = document.getElementById('patient-list');

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    });

    dashboardLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (isLoggedIn()) {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loadDashboard();
        } else {
            alert('Please login first');
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Here you would typically send a request to your backend to authenticate
        // For this example, we'll just simulate a successful login
        if (username && password) {
            localStorage.setItem('user', JSON.stringify({ username, role }));
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loadDashboard();
        }
    });

    function isLoggedIn() {
        return localStorage.getItem('user') !== null;
    }

    function loadDashboard() {
        const user = JSON.parse(localStorage.getItem('user'));
        userInfo.textContent = `Welcome, ${user.username} (${user.role})`;

        // Here you would typically fetch patient data from your backend
        // For this example, we'll just use some dummy data
        const patients = [
            { id: 1, name: 'John Doe', status: 'Waiting' },
            { id: 2, name: 'Jane Smith', status: 'In consultation' },
            { id: 3, name: 'Bob Johnson', status: 'Lab test pending' },
        ];

        patientList.innerHTML = '<h3>Patient List</h3>';
        patients.forEach(patient => {
            patientList.innerHTML += `
                <div>
                    <p>Name: ${patient.name}</p>
                    <p>Status: ${patient.status}</p>
                </div>
            `;
        });
    }
});