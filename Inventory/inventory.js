// Event listeners for sort and search actions
document.getElementById('sortBtn').addEventListener('click', () => {
    const sortBy = document.getElementById('sortOptions').value;
    sortInventory(sortBy);
});

document.getElementById('searchBox').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filterInventory(searchTerm);
});

// Function to filter inventory items based on search term
function filterInventory(searchTerm) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; 

    const filteredInventory = inventory.filter(item => {
        return (
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            item.supplier.toLowerCase().includes(searchTerm) ||
            item.expiryDate.includes(searchTerm) ||
            item.quantity.toString().includes(searchTerm)
        );
    });

    displayInventory(filteredInventory);
}

// Function to sort inventory items based on selected criteria
function sortInventory(sortBy, order = 'asc') {
    const sortedInventory = [...inventory]; // Create a copy of the inventory array to sort

    switch (sortBy) {
        case 'name':
            sortedInventory.sort((a, b) => {
                return order === 'asc' 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });
            break;
        case 'category':
            sortedInventory.sort((a, b) => {
                return order === 'asc' 
                    ? a.category.localeCompare(b.category)
                    : b.category.localeCompare(a.category);
            });
            break;
        case 'quantity':
            // Sort by quantity, ignoring categories
            sortedInventory.sort((a, b) => {
                return order === 'asc' 
                    ? a.quantity - b.quantity // Ascending order
                    : b.quantity - a.quantity; // Descending order
            });
            break;
        case 'expiryDate':
            sortedInventory.sort((a, b) => {
                const dateA = new Date(a.expiryDate);
                const dateB = new Date(b.expiryDate);
                return order === 'asc' 
                    ? dateA - dateB 
                    : dateB - dateA;
            });
            break;
        case 'supplier':
            sortedInventory.sort((a, b) => {
                return order === 'asc' 
                    ? a.supplier.localeCompare(b.supplier)
                    : b.supplier.localeCompare(a.supplier);
            });
            break;
        default:
            console.warn("Unknown sort option:", sortBy);
            break;
    }

    displayInventory(sortedInventory); // Display the sorted inventory
}

// Function to display the inventory items in the table
function displayInventory(items) {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear the existing rows

    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.supplier}</td>
        `;
        inventoryList.appendChild(row);
    });
}

// Sample inventory items (without "Date Added")
const inventory = [
    { no: 1, name: 'Item A', category: 'Category 1', quantity: 100, expiryDate: '2024-12-01', supplier: 'Supplier A' },
    { no: 2, name: 'Item B', category: 'Category 2', quantity: 50, expiryDate: '2024-11-15', supplier: 'Supplier B' },
    { no: 3, name: 'Item C', category: 'Category 3', quantity: 75, expiryDate: '2024-10-10', supplier: 'Supplier C' },
    { no: 4, name: 'Item D', category: 'Category 1', quantity: 120, expiryDate: '2024-12-22', supplier: 'Supplier D' },
    { no: 5, name: 'Item E', category: 'Category 4', quantity: 20, expiryDate: '2024-11-05', supplier: 'Supplier E' },
    { no: 6, name: 'Item F', category: 'Category 2', quantity: 80, expiryDate: '2025-01-02', supplier: 'Supplier F' }
];

// Initial display of all inventory items
displayInventory(inventory);

// JavaScript for Search, Sort, and Edit/Delete functionality
document.addEventListener('DOMContentLoaded', function() {
    // No need for separate delete and edit button listeners in the main logic, since we're dynamically adding rows

    // Event listeners can be attached directly in the display function if needed
});


//add item button
document.getElementById('addItemBtn').addEventListener('click', function() {
    document.getElementById('addItemModal').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('addItemModal').style.display = 'none';
});

window.onclick = function(event) {
    const modal = document.getElementById('addItemModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle form submission and add new item to the inventory
document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get values from form inputs
    const itemName = document.getElementById('itemName').value;
    const category = document.getElementById('category').value;
    const quantity = document.getElementById('quantity').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const supplier = document.getElementById('supplier').value;
    const minStock = document.getElementById('minStock').value;
    
    // Add the new item to the inventory
    const inventoryList = document.getElementById('inventoryList');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${inventoryList.rows.length + 1}</td>
        <td>${itemName}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>${expiryDate}</td>
        <td>${supplier}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    
    inventoryList.appendChild(newRow);
    
    // Clear the form
    document.getElementById('addItemForm').reset();
    
    // Close the modal
    document.getElementById('addItemModal').style.display = 'none';
});


//Update item
 
// Inventory data
let inventory_update = [
    { no: 1, name: 'Item A', category: 'Category 1', quantity: 100, expiryDate: '2024-12-01', supplier: 'Supplier A' },
    { no: 2, name: 'Item B', category: 'Category 2', quantity: 50, expiryDate: '2024-11-15', supplier: 'Supplier B' },
    { no: 3, name: 'Item C', category: 'Category 3', quantity: 75, expiryDate: '2024-10-10', supplier: 'Supplier C' },
    { no: 4, name: 'Item D', category: 'Category 1', quantity: 120, expiryDate: '2024-12-22', supplier: 'Supplier D' },
    { no: 5, name: 'Item E', category: 'Category 4', quantity: 20, expiryDate: '2024-11-05', supplier: 'Supplier E' },
    { no: 6, name: 'Item F', category: 'Category 2', quantity: 80, expiryDate: '2025-01-02', supplier: 'Supplier F' }
];

// Get elements for the update modal
const updateItemModal = document.getElementById("updateItemModal");
const closeUpdateBtn = document.querySelector(".close-update-btn");
const updateItemSelect = document.getElementById("updateItemSelect");
const updateItemDetails = document.getElementById("updateItemDetails");
const updateItemName = document.getElementById("updateItemName");
const updateCategory = document.getElementById("updateCategory");
const updateQuantity = document.getElementById("updateQuantity");
const updateExpiryDate = document.getElementById("updateExpiryDate");
const updateSupplier = document.getElementById("updateSupplier");
const confirmUpdateBtn = document.getElementById("confirmUpdateBtn");
const updateItemBtn = document.getElementById("updateItemBtn");
const inventoryTableBody = document.getElementById("inventoryTableBody"); // Make sure you have this in your HTML

// Function to show the update modal
updateItemBtn.onclick = function() {
    updateItemModal.style.display = "block";
    populateUpdateDropdown(); // Populate dropdown with items
};

// Populate dropdown with inventory items
function populateUpdateDropdown() {
    updateItemSelect.innerHTML = '<option value="">-- Select an Item --</option>'; // Clear existing options
    inventory.forEach(item => {
        const option = document.createElement("option");
        option.value = item.no;
        option.text = item.name;
        updateItemSelect.appendChild(option);
    });
}

// Display selected item details for updating
updateItemSelect.onchange = function() {
    const selectedItemNo = parseInt(updateItemSelect.value);
    const selectedItem = inventory.find(item => item.no === selectedItemNo);

    if (selectedItem) {
        // Fill the input fields with the selected item details
        updateItemName.value = selectedItem.name;
        updateCategory.value = selectedItem.category;
        updateQuantity.value = selectedItem.quantity;
        updateExpiryDate.value = selectedItem.expiryDate;
        updateSupplier.value = selectedItem.supplier;
        updateItemDetails.style.display = "block"; // Show the details section
    } else {
        updateItemDetails.style.display = "none"; // Hide if no item is selected
    }
};

// Close the modal when the close button is clicked
closeUpdateBtn.onclick = function() {
    updateItemModal.style.display = "none";
};

// Function to refresh the inventory table
function populateInventoryTable() {
    inventoryTableBody.innerHTML = ''; // Clear existing table rows
    inventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.supplier}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

// Confirm update action and update the inventory
confirmUpdateBtn.onclick = function() {
    const selectedItemNo = parseInt(updateItemSelect.value);
    const selectedItemIndex = inventory.findIndex(item => item.no === selectedItemNo);
    
    if (selectedItemIndex !== -1) {
        // Update the item details in the inventory array
        inventory[selectedItemIndex] = {
            no: selectedItemNo,
            name: updateItemName.value,
            category: updateCategory.value,
            quantity: parseInt(updateQuantity.value),
            expiryDate: updateExpiryDate.value,
            supplier: updateSupplier.value
        };

        alert(`Item "${updateItemName.value}" has been updated!`);

        // Close the modal
        updateItemModal.style.display = "none";

        // Refresh the inventory table
        populateInventoryTable();
    } else {
        alert("No item selected for update!");
    }
};

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == updateItemModal) {
        updateItemModal.style.display = "none";
    }
};

// Populate the table on page load
window.onload = function() {
    populateInventoryTable(); // Populate the inventory table when the page loads
};


//Remove item


let inventory_remove = [
    { no: 1, name: 'Item A', category: 'Category 1', quantity: 100, expiryDate: '2024-12-01', supplier: 'Supplier A' },
    { no: 2, name: 'Item B', category: 'Category 2', quantity: 50, expiryDate: '2024-11-15', supplier: 'Supplier B' },
    { no: 3, name: 'Item C', category: 'Category 3', quantity: 75, expiryDate: '2024-10-10', supplier: 'Supplier C' },
    { no: 4, name: 'Item D', category: 'Category 1', quantity: 120, expiryDate: '2024-12-22', supplier: 'Supplier D' },
    { no: 5, name: 'Item E', category: 'Category 4', quantity: 20, expiryDate: '2024-11-05', supplier: 'Supplier E' },
    { no: 6, name: 'Item F', category: 'Category 2', quantity: 80, expiryDate: '2025-01-02', supplier: 'Supplier F' }
];

// Get elements
const removeItemBtn = document.getElementById("removeItemBtn");
const removeModal = document.getElementById("removeModal");
const closeRemoveModal = document.getElementById("closeRemoveModal");
const cancelRemoveBtn = document.getElementById("cancelRemoveBtn");
const confirmRemoveBtn = document.getElementById("confirmRemoveBtn");
const removeItemDropdown = document.getElementById("removeItemDropdown");
const removeItemName = document.getElementById("removeItemName");

// Ensure the modal is hidden initially
removeModal.style.display = "none";

// Populate dropdown with inventory items
function populateRemoveDropdown() {
    removeItemDropdown.innerHTML = '<option value="">--Select an Item--</option>'; // Clear existing options
    inventory.forEach(item => {
        const option = document.createElement("option");
        option.value = item.no;
        option.text = item.name;
        removeItemDropdown.appendChild(option);
    });
}

// Populate inventory table
function populateInventoryTable() {
    const inventoryTableBody = document.getElementById("inventoryTable").querySelector("tbody");
    inventoryTableBody.innerHTML = ""; // Clear existing rows

    inventory.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.supplier}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

// Display selected item name for confirmation
removeItemDropdown.onchange = function() {
    const selectedItemNo = parseInt(removeItemDropdown.value);
    const selectedItem = inventory.find(item => item.no === selectedItemNo);

    if (selectedItem) {
        removeItemName.textContent = selectedItem.name;
    } else {
        removeItemName.textContent = ''; // Clear if nothing is selected
    }
};

// Show the modal when the "Remove Item" button is clicked
removeItemBtn.onclick = function() {
    removeModal.style.display = "block";
    populateRemoveDropdown();  // Populate the dropdown when modal is opened
};

// Close the modal when the close button is clicked
closeRemoveModal.onclick = function() {
    removeModal.style.display = "none";
};

// Close the modal when the cancel button is clicked
cancelRemoveBtn.onclick = function() {
    removeModal.style.display = "none";
};

// Confirm removal action and update the inventory
confirmRemoveBtn.onclick = function() {
    const selectedItemNo = parseInt(removeItemDropdown.value);
    const selectedItemIndex = inventory.findIndex(item => item.no === selectedItemNo);
    
    if (selectedItemIndex !== -1) {
        // Remove the item from the inventory array
        const removedItem = inventory.splice(selectedItemIndex, 1)[0]; // Remove and store removed item
        alert(`Item "${removedItem.name}" has been removed!`);

        // Update the dropdown after removal
        populateRemoveDropdown();

        // Update the inventory table after removal
        populateInventoryTable(); // Call the function to update the table
        
        // Hide the modal
        removeModal.style.display = "none";
        
        // Clear the displayed item name
        removeItemName.textContent = '';
    } else {
        alert("No item selected for removal!");
    }
};

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    if (event.target == removeModal) {
        removeModal.style.display = "none";
    }
};

// Call this function when the page loads to display initial inventory
populateInventoryTable();


//------inventory report
// Sample inventory data
let inventoryData = [
    { no: 1, name: 'Item A', category: 'Category 1', quantity: 100, expiryDate: '2024-12-01', supplier: 'Supplier A' },
    { no: 2, name: 'Item B', category: 'Category 2', quantity: 50, expiryDate: '2024-11-15', supplier: 'Supplier B' },
    { no: 3, name: 'Item C', category: 'Category 3', quantity: 75, expiryDate: '2024-10-10', supplier: 'Supplier C' },
    { no: 4, name: 'Item D', category: 'Category 1', quantity: 120, expiryDate: '2024-12-22', supplier: 'Supplier D' },
    { no: 5, name: 'Item E', category: 'Category 4', quantity: 20, expiryDate: '2024-11-05', supplier: 'Supplier E' },
    { no: 6, name: 'Item F', category: 'Category 2', quantity: 80, expiryDate: '2025-01-02', supplier: 'Supplier F' }
];

// Populate the inventory table
function populateInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = ''; // Clear existing content

    inventoryData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.no}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.expiryDate}</td>
            <td>${item.supplier}</td>
        `;
        inventoryList.appendChild(row);
    });
}

// Get the modal
const modal = document.getElementById("reportModal");

// Get the button that opens the modal
const reportBtn = document.getElementById("reportBtn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".close");

// When the user clicks on the report button, open the modal
reportBtn.onclick = function() {
    // Update modal content
    document.getElementById("modalTotalItems").innerText = inventoryData.length; // Update with actual inventory count
    const categories = [...new Set(inventoryData.map(item => item.category))]; // Get unique categories
    document.getElementById("modalTotalCategories").innerText = categories.length; // Update with unique category count

    modal.style.display = "block"; // Show modal
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none"; // Hide modal
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide modal
    }
}

// Populate inventory data on page load
populateInventory();
