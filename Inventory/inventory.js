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

// Event listener for the update item button
document.getElementById('updateItemBtn').addEventListener('click', function() {
    // Show the update modal and populate dropdown
    const updateItemSelect = document.getElementById('updateItemSelect');
    updateItemSelect.innerHTML = '<option value="">-- Select an Item --</option>'; // Reset dropdown options

    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.no; // Use the item's no or ID
        option.textContent = item.name; // Display the item name
        updateItemSelect.appendChild(option);
    });

    document.getElementById('updateItemModal').style.display = 'block'; // Show the modal
});

// Close button functionality for the update item modal
document.querySelector('.close-update-btn').addEventListener('click', function() {
    document.getElementById('updateItemModal').style.display = 'none';
});

// Event listener for selecting an item to update
document.getElementById('updateItemSelect').addEventListener('change', function() {
    const selectedItemNo = this.value;
    const selectedItem = inventory.find(item => item.no == selectedItemNo);

    if (selectedItem) {
        // Populate the input fields with the selected item's details
        document.getElementById('updateItemName').value = selectedItem.name;
        document.getElementById('updateCategory').value = selectedItem.category;
        document.getElementById('updateQuantity').value = selectedItem.quantity;
        document.getElementById('updateExpiryDate').value = selectedItem.expiryDate;
        document.getElementById('updateSupplier').value = selectedItem.supplier;
        document.getElementById('updateItemDetails').style.display = 'block'; // Show details section
    } else {
        document.getElementById('updateItemDetails').style.display = 'none'; // Hide if no selection
    }
});

// Function to confirm updates
document.getElementById('confirmUpdateBtn').addEventListener('click', function() {
    const selectedItemNo = document.getElementById('updateItemSelect').value;

    if (selectedItemNo) {
        const updatedItem = {
            no: parseInt(selectedItemNo),
            name: document.getElementById('updateItemName').value,
            category: document.getElementById('updateCategory').value,
            quantity: parseInt(document.getElementById('updateQuantity').value),
            expiryDate: document.getElementById('updateExpiryDate').value,
            supplier: document.getElementById('updateSupplier').value
        };

        // Update item in the inventory
        inventory = inventory.map(item => item.no === updatedItem.no ? updatedItem : item);

        // Close the modal
        document.getElementById('updateItemModal').style.display = 'none';

        // Refresh the inventory display
        displayInventory(inventory);
        
        alert('Item updated successfully!'); // Optional: Alert user
    } else {
        alert('Please select an item to update.'); // Alert if no item is selected
    }
});


//Remove item
// Sample inventory items (without "Date Added")
let inventory = [
    { no: 1, name: 'Item A', category: 'Category 1', quantity: 100, expiryDate: '2024-12-01', supplier: 'Supplier A' },
    { no: 2, name: 'Item B', category: 'Category 2', quantity: 50, expiryDate: '2024-11-15', supplier: 'Supplier B' },
    { no: 3, name: 'Item C', category: 'Category 3', quantity: 75, expiryDate: '2024-10-10', supplier: 'Supplier C' },
    { no: 4, name: 'Item D', category: 'Category 1', quantity: 120, expiryDate: '2024-12-22', supplier: 'Supplier D' },
    { no: 5, name: 'Item E', category: 'Category 4', quantity: 20, expiryDate: '2024-11-05', supplier: 'Supplier E' },
    { no: 6, name: 'Item F', category: 'Category 2', quantity: 80, expiryDate: '2025-01-02', supplier: 'Supplier F' }
];

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
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        inventoryList.appendChild(row);
    });
}

// Initial display of all inventory items
displayInventory(inventory);

// Event listener for the remove item button
document.getElementById('removeItemBtn').addEventListener('click', function() {
    // Show the removal modal and populate dropdown
    const removeItemSelect = document.getElementById('removeItemSelect');
    removeItemSelect.innerHTML = '<option value="">-- Select an Item --</option>'; // Reset dropdown options

    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.no; // Use the item's no or ID
        option.textContent = item.name; // Display the item name
        removeItemSelect.appendChild(option);
    });

    document.getElementById('removeItemModal').style.display = 'block'; // Show the modal
});

// Close button functionality for the remove item modal
document.querySelector('.close-remove-btn').addEventListener('click', function() {
    document.getElementById('removeItemModal').style.display = 'none';
});

// Function to remove item based on selected value
document.getElementById('confirmRemovalBtn').addEventListener('click', function() {
    const selectedItem = document.getElementById('removeItemSelect').value; // Get selected item

    if (selectedItem) {
        // Remove item from inventory
        inventory = inventory.filter(item => item.no !== parseInt(selectedItem)); // Update the inventory array
        
        // Close the modal
        document.getElementById('removeItemModal').style.display = 'none';

        // Refresh the inventory display
        displayInventory(inventory);
        
        alert('Item removed successfully!'); // Optional: Alert user
    } else {
        alert('Please select an item to remove.'); // Alert if no item is selected
    }
});
