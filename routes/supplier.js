const express = require('express');
const app = express.Router();

function renderSupplierWorkspace(req, res, errorMsg = null) {
    let openOrdersSQL = `
        SELECT o.OrderID, o.OrderDate, o.Status, c.CompanyName AS ContractorName,
               (SELECT SUM(Quantity * UnitPrice) FROM ORDER_ITEM_MVP oi WHERE oi.OrderID = o.OrderID) AS EstimatedTotal
        FROM ORDER_MVP o
        LEFT JOIN COMPANY_MVP c ON o.ContractorID = c.CompanyID
        WHERE o.Status IN ('Pending', 'Approved')
        ORDER BY o.OrderID DESC`;

    let quotesSQL = `
        SELECT q.*, s.CompanyName AS SupplierName, (q.Status = 'Pending') AS isPending
        FROM QUOTE_MVP q
        LEFT JOIN COMPANY_MVP s ON q.SupplierID = s.CompanyID
        ORDER BY q.QuoteID DESC`;

    app.connection.query(openOrdersSQL, (err, receivedOrders) => {
        app.connection.query("SELECT * FROM COMPANY_MVP WHERE CompanyType='Supplier'", (err2, suppliers) => {
            app.connection.query(quotesSQL, (err3, quotes) => {
                res.render('supplier/index', {
                    receivedOrders: receivedOrders || [],
                    suppliers: suppliers || [],
                    quotes: quotes || [],
                    errorMsg: errorMsg
                });
            });
        });
    });
}

// READ Supplier Workspace
app.get(['/', ''], (req, res) => {
    renderSupplierWorkspace(req, res);
});

// CREATE Quote (Supplier sends quotation to contractor)
app.post('/quote/add', (req, res) => {
    let SQL = "INSERT INTO QUOTE_MVP (OrderID, SupplierID, QuotedTotal, Status) VALUES (?, ?, ?, 'Pending')";
    let params = [req.body.OrderID, req.body.SupplierID, req.body.QuotedTotal];
    app.connection.execute(SQL, params, (err) => {
        renderSupplierWorkspace(req, res, err ? err.sqlMessage : null);
    });
});

// UPDATE Quote Price
app.post('/quote/edit/:id', (req, res) => {
    let SQL = "UPDATE QUOTE_MVP SET QuotedTotal=? WHERE QuoteID=? AND Status='Pending'";
    app.connection.execute(SQL, [req.body.QuotedTotal, req.params.id], (err) => {
        renderSupplierWorkspace(req, res, err ? err.sqlMessage : null);
    });
});

// DELETE Quote
app.post('/quote/delete/:id', (req, res) => {
    let SQL = "DELETE FROM QUOTE_MVP WHERE QuoteID=? AND Status='Pending'";
    app.connection.execute(SQL, [req.params.id], (err) => {
        renderSupplierWorkspace(req, res, err ? err.sqlMessage : null);
    });
});

module.exports = app;