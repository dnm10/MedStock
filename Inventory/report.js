// Add a new row to the Current Stock Levels table
function addStockRow() {
    const table = document.getElementById('stockLevels');
    const newRow = table.insertRow();
    
    const itemName = prompt("Enter Item Name:");
    const category = prompt("Enter Category:");
    const quantity = prompt("Enter Quantity:");

    newRow.insertCell(0).innerHTML = itemName;
    newRow.insertCell(1).innerHTML = category;
    newRow.insertCell(2).innerHTML = quantity;
    newRow.insertCell(3).innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

// Add a new row to the Low Stock Alerts table
function addLowStockRow() {
    const table = document.getElementById('lowStock');
    const newRow = table.insertRow();

    const itemName = prompt("Enter Item Name:");
    const category = prompt("Enter Category:");
    const currentStock = prompt("Enter Current Stock:");
    const minimumStock = prompt("Enter Minimum Stock:");

    newRow.insertCell(0).innerHTML = itemName;
    newRow.insertCell(1).innerHTML = category;
    newRow.insertCell(2).innerHTML = currentStock;
    newRow.insertCell(3).innerHTML = minimumStock;
    newRow.insertCell(4).innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

// Add a new row to the Expired Items table
function addExpiredItemRow() {
    const table = document.getElementById('expiredItems');
    const newRow = table.insertRow();

    const itemName = prompt("Enter Item Name:");
    const category = prompt("Enter Category:");
    const expiryDate = prompt("Enter Expiry Date (YYYY-MM-DD):");
    const batchNo = prompt("Enter Batch No.:");

    newRow.insertCell(0).innerHTML = itemName;
    newRow.insertCell(1).innerHTML = category;
    newRow.insertCell(2).innerHTML = expiryDate;
    newRow.insertCell(3).innerHTML = batchNo;
    newRow.insertCell(4).innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

// Function to delete a row
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Generate recommendations
function generateRecommendations() {
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = `
        <li>Review low stock and reorder items.</li>
        <li>Discard expired items promptly.</li>
    `;
}

// Dummy functions for Export to PDF, Excel, and Print (for future implementation)
function exportToPDF() {
    alert("Export to PDF feature is not implemented yet.");
}

    