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
    inventoryList.innerHTML = ''; // Clear existing rows

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
function sortInventory(sortBy) {
    const sortedInventory = [...inventory]; // Create a copy of the inventory array to sort

    switch (sortBy) {
        case 'name':
            sortedInventory.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'category':
            sortedInventory.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'quantity':
            sortedInventory.sort((a, b) => a.quantity - b.quantity);
            break;
        case 'expiryDate':
            sortedInventory.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
            break;
        case 'supplier':
            sortedInventory.sort((a, b) => a.supplier.localeCompare(b.supplier));
            break;
        default:
            break;
    }

    displayInventory(sortedInventory);
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
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    const sortButton = document.getElementById('sortBtn');
    const searchBox = document.getElementById('searchBox');
    const inventoryList = document.getElementById('inventoryList');

    // Search functionality
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = inventoryList.getElementsByTagName('tr');
        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let found = false;
            Array.from(cells).forEach(cell => {
                if (cell.innerText.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            row.style.display = found ? '' : 'none'; // Show or hide the row
        });
    });

    // Sort functionality
    sortButton.addEventListener('click', function() {
        const selectedOption = document.getElementById('sortOptions').value;
        const rows = Array.from(inventoryList.getElementsByTagName('tr'));
        const indexMap = {
            name: 1,
            category: 2,
            quantity: 3,
            expiryDate: 4,
            supplier: 5,
        };
        const index = indexMap[selectedOption];

        // Sort the rows based on selected criteria
        rows.sort((a, b) => {
            const cellA = a.getElementsByTagName('td')[index].innerText.toLowerCase();
            const cellB = b.getElementsByTagName('td')[index].innerText.toLowerCase();
            if (cellA < cellB) return -1;
            if (cellA > cellB) return 1;
            return 0;
        });

        // Clear the table and append sorted rows
        inventoryList.innerHTML = '';
        rows.forEach(row => {
            if (row.style.display !== 'none') {
                inventoryList.appendChild(row);
            }
        });
    });

    // Delete functionality
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.parentElement.parentElement; // Get the row
            row.remove(); // Remove the row from the table
            alert('Item deleted successfully!');
        });
    });

    // Edit functionality
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.parentElement.parentElement.cells[1].innerText; // Get the item name
            alert(`Edit functionality for ${itemName} not implemented yet.`);
            // Here you can add code to handle editing the item
        });
    });
});








