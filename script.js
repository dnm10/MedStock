document.addEventListener("DOMContentLoaded", () => {
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");
    const showPopupBtn = document.querySelector(".login-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

    function searchFunction() {
        const searchQuery = document.getElementById("search").value;
        if (searchQuery) {
          alert("Searching for: " + searchQuery);
          // You can replace the alert with actual search functionality.
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

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to validate password
    function validatePassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
    }

    // Function to show error messages
    function showError(inputField, message) {
        const errorElement = inputField.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = "red";
        }
    }

    // Function to clear error messages
    function clearError(inputField) {
        const errorElement = inputField.nextElementSibling;
        if (errorElement) {
            errorElement.textContent = "";
        }
    }

    // Validate Login Form
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");
        let valid = true;

        clearError(email);
        clearError(password);

        if (!emailPattern.test(email.value)) {
            showError(email, "Please enter a valid email address.");
            valid = false;
        }

        if (!validatePassword(password.value)) {
            showError(password, "Password must be at least 6 characters.");
            valid = false;
        }

        if (valid) {
            alert("Login successful!");
        }
    });

    // Validate Signup Form
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName");
        const email = document.getElementById("signupEmail");
        const password = document.getElementById("signupPassword");
        const policy = document.getElementById("policy");
        let valid = true;

        clearError(fullName);
        clearError(email);
        clearError(password);

        if (fullName.value.length < 5) {
            showError(fullName, "Name should be at least 5 characters.");
            valid = false;
        }

        if (!emailPattern.test(email.value)) {
            showError(email, "Please enter a valid email address.");
            valid = false;
        }

        if (!validatePassword(password.value)) {
            showError(password, "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.");
            valid = false;
        }

        if (!policy.checked) {
            alert("You must agree to the Terms & Conditions.");
            valid = false;
        }

        if (valid) {
            alert("Signup successful!");
        }
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
