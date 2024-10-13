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
