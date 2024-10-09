let totalAmount = 0;

function addToBill() {
    const medicineName = document.getElementById('medicine-name').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);

    if (medicineName === '' || quantity <= 0 || price <= 0) {
        alert("Please fill out all fields with valid values.");
        return;
    }

    const total = quantity * price;

    // Add row to bill summary
    const tableBody = document.getElementById('bill-table-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${medicineName}</td>
        <td>${quantity}</td>
        <td>Rs ${price.toFixed(2)}</td>
        <td>RS ${total.toFixed(2)}</td>
    `;
    tableBody.appendChild(newRow);

    // Update total amount
    totalAmount += total;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    // Clear input fields
    document.getElementById('billing-form').reset();
}

function generateInvoice() {
    const invoiceWindow = window.open('', '_blank', 'width=600,height=400');
    invoiceWindow.document.write(`
        <html>
            <head>
                <title>Invoice</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    h1 {
                        text-align: center;
                        color: #007BFF;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    table th, table td {
                        padding: 10px;
                        border: 1px solid #ccc;
                        text-align: center;
                    }
                    table th {
                        background-color: #007BFF;
                        color: white;
                    }
                    h3 {
                        text-align: right;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <h1>Invoice</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Price per Unit</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="invoice-body">
                       Rs{getInvoiceItems()}
                    </tbody>
                </table>
                <h3>Total Amount: Rs ${totalAmount.toFixed(2)}</h3>
            </body>
        </html>
    `);
    invoiceWindow.document.close();
    invoiceWindow.print();
}

function getInvoiceItems() {
    const tableBody = document.getElementById('bill-table-body');
    let items = '';
    for (const row of tableBody.rows) {
        items += `<tr>
            <td>${row.cells[0].innerText}</td>
            <td>${row.cells[1].innerText}</td>
            <td>${row.cells[2].innerText}</td>
            <td>${row.cells[3].innerText}</td>
        </tr>`;
    }
    return items;
}

