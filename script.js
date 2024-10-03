document.addEventListener("DOMContentLoaded", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");
    const showPopupBtn = document.querySelector(".login-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

    // Show mobile menu
    hamburgerBtn.addEventListener("click", () => {
        navbarMenu.classList.toggle("show-menu");
    });

    // Hide mobile menu
    hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

    // Show login popup
    showPopupBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
    });

    // Hide login popup
    hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

    // Show or hide signup form
    signupLoginLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
        });
    });

    // Function to validate email
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate password (at least 6 characters, contains uppercase, lowercase, and a digit)
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // At least 6 characters, 1 uppercase, 1 lowercase, 1 digit
        return passwordRegex.test(password);
    }

    // LOGIN FORM VALIDATION
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const loginEmail = document.getElementById('loginEmail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();

        // Check if email is valid
        if (!validateEmail(loginEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if password is valid
        if (!validatePassword(loginPassword)) {
            alert("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
            return;
        }

        // If both fields are valid, submit the form (you can replace this with actual logic)
        alert("Login form submitted successfully!");
        // You can redirect or submit the form here
    });

    // SIGNUP FORM VALIDATION
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const fullName = document.getElementById('fullName').value.trim();
        const signupEmail = document.getElementById('signupEmail').value.trim();
        const signupPassword = document.getElementById('signupPassword').value.trim();
        const policyChecked = document.getElementById('policy').checked;

        // Check if full name is provided
        if (fullName === "") {
            alert("Please enter your full name.");
            return;
        }

        // Check if email is valid
        if (!validateEmail(signupEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if password is valid
        if (!validatePassword(signupPassword)) {
            alert("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
            return;
        }

        // Check if Terms and Conditions are accepted
        if (!policyChecked) {
            alert("You must agree to the Terms & Conditions.");
            return;
        }

        // If all fields are valid, submit the form (you can replace this with actual logic)
        alert("Signup form submitted successfully!");
        // You can redirect or submit the form here
    });

    // Sidebar toggle functionality
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebarBtn.onclick = function() {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
            sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    };
});
