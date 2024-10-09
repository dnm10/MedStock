document.addEventListener("DOMContentLoaded", function () {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");
    const formPopup = document.querySelector(".form-popup");
    const showPopupBtn = document.querySelector(".login-btn");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

    // Show/Hide Navbar Menu
    hamburgerBtn.addEventListener("click", () => {
        navbarMenu.classList.toggle("show-menu");
    });

    hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

    // Show/Hide Login Popup
    showPopupBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
    });

    hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

    // Toggle between login and signup forms
    signupLoginLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList.toggle("show-signup");
        });
    });

    // Signup Form Submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.querySelector('input[name="signup-type"]:checked').value;

        let overallError = '';

        if (!fullName) {
            overallError += 'Please enter your full name.\n';
        }
        if (!validateEmail(email)) {
            overallError += 'Please enter a valid email address.\n';
        }
        if (!validatePassword(password)) {
            overallError += 'Password does not meet the required criteria.\n';
        }

        if (overallError) {
            alert(overallError);
        } else {
            // Redirect based on the selected role
            if (role === 'Admin') {
                window.location.href = 'adminPage.html'; // Ensure the correct path
            } else {
                window.location.href = 'userPage.html'; // Ensure the correct path
            }
        }
    });
}

// Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const loginType = document.querySelector('input[name="loginType"]:checked');
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        let overallError = '';

        // Check if login type is selected
        if (!loginType) {
            overallError += 'Please select a login type (Admin or User).\n';
        }
        // Validate email format
        if (!validateEmail(email)) {
            overallError += 'Please enter a valid email address.\n';
        }
        // Validate password
        if (!validatePassword(password)) {
            overallError += 'Password does not meet the required criteria.\n';
        }

        if (overallError) {
            alert(overallError);
        } else {
            // Redirect based on login type
            if (loginType.value === "Admin") {
                console.log("Redirecting to admin page");
                window.location.href = 'adminPage.html'; // Ensure the correct path
            } else {
                console.log("Redirecting to user page");
                window.location.href = 'userPage.html'; // Ensure the correct path
            }
        }
    });
}

// Email and Password Validation
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    let errorMessage = '';
    if (password.length < 6) {
        errorMessage += 'Password must be at least 6 characters long.\n';
    }
    if (!/[a-z]/.test(password)) {
        errorMessage += 'Password must contain at least one lowercase letter.\n';
    }
    if (!/[A-Z]/.test(password)) {
        errorMessage += 'Password must contain at least one uppercase letter.\n';
    }
    if (!/\d/.test(password)) {
        errorMessage += 'Password must contain at least one number.\n';
    }
    if (!/[@$!%*?&]/.test(password)) {
        errorMessage += 'Password must contain at least one special character (@, $, !, %, *, ?, &).\n';
    }

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    return true;
}

    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".sidebarBtn");
    if (sidebarBtn) {
        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
        };
    }
});
