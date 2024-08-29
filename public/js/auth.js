document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout');

    // Fetch CSRF token before any POST request
    function fetchCSRFToken() {
        return fetch('/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include' // Ensures cookies are included in requests
        });
    }

    // Helper function to get CSRF token from cookies
    function getCSRFTokenFromCookies() {
        const csrfToken = document.cookie.split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
            console.log(csrfToken);
        return csrfToken ? decodeURIComponent(csrfToken) : null;
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Fetch the CSRF token before making the POST request
            fetchCSRFToken().then(() => {
                const csrfToken = getCSRFTokenFromCookies(); // Fetch the CSRF token from cookies

                fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken, // Include the CSRF token in the request header
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => {
                    if (response.status === 419) {
                        alert('CSRF token mismatch. Please refresh the page and try again.');
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data.access_token) {
                        localStorage.setItem('access_token', data.access_token);
                        window.location.href = 'projects.html';
                    } else {
                        alert('Login failed: ' + (data.message || 'Unknown error'));
                    }
                })
                .catch(error => console.error('Error during login:', error));
            });
        });
    }

    // Register
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Fetch the CSRF token before making the POST request
            fetchCSRFToken().then(() => {
                const csrfToken = getCSRFTokenFromCookies(); // Fetch the CSRF token from cookies

                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': csrfToken // Include the CSRF token in the request header
                    },
                    body: JSON.stringify({ name, email, password })
                })
                .then(response => {
                    if (response.status === 419) {
                        alert('CSRF token mismatch. Please refresh the page and try again.');
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    if (data.access_token) {
                        localStorage.setItem('access_token', data.access_token);
                        window.location.href = 'projects.html';
                    } else {
                        alert('Registration failed: ' + (data.message || 'Unknown error'));
                    }
                })
                .catch(error => console.error('Error during registration:', error));
            });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('access_token');  // Clear the authentication token
            window.location.href = 'login.html';  // Redirect to the login page
        });
    }
});
