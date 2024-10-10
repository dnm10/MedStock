document.addEventListener("DOMContentLoaded", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");
    const showPopupBtn = document.querySelector(".signup-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

    // Function to search
    function searchFunction() {
        const searchQuery = document.getElementById("search").value;
        if (searchQuery) {
            alert("Searching for: " + searchQuery);
            // Replace alert with actual search functionality
        } else {
            alert("Please enter a search query.");
        }
    }

    // Show mobile menu
    hamburgerBtn.addEventListener("click", () => {
        navbarMenu.classList.toggle("show-menu");
    });

    // Hide mobile menu
    hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

    // Show signup form by default when the popup opens
    showPopupBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
        formPopup.classList.add("show-signup"); // Show signup form by default
    });

    // Hide the popup and reset to login view
    hidePopupBtn.addEventListener("click", () => {
        document.body.classList.remove("show-popup");
        formPopup.classList.remove("show-signup"); // Reset to login form when popup is closed
    });

    // Toggle between login and signup forms
    signupLoginLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList.toggle("show-signup");
        });
    });

    // Full Name Validation
    function validateFullName(fullName) {
        const namePattern = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;
        return namePattern.test(fullName);
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

            // Validate Full Name
            if (!validateFullName(fullName)) {
                overallError += 'Please enter your full name (first and last name, each starting with an uppercase letter).\n';
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
                // Redirect based on role
                if (role === 'Admin') {
                    window.location.href = 'adminPage.html';
                } else {
                    window.location.href = 'userPage.html';
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

            // Validate login type
            if (!loginType) {
                overallError += 'Please select a login type (Admin or User).\n';
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
                if (loginType.value === "Admin") {
                    window.location.href = 'adminPage.html';
                } else {
                    window.location.href = 'userPage.html';
                }
            }
        });
    }

    // Sidebar toggle functionality
    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function () {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    };
});
