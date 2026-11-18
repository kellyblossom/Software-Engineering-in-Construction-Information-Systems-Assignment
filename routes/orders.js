const express = require('express');
const app = express.Router();

function renderOrders(req, res, errorMsg = null) {
    let orderSQL = `
        SELECT o.*, c.CompanyName AS ContractorName,
               (o.Status = 'Draft') AS isDraft
        FROM ORDER_MVP o
        LEFT JOIN COMPANY_MVP c ON o.ContractorID = c.CompanyID
        ORDER BY o.OrderID DESC`;
    let quoteSQL = `
        SELECT q.*, s.CompanyName AS SupplierName, (q.Status = 'Pending') AS isPending
        FROM QUOTE_MVP q
        LEFT JOIN COMPANY_MVP s ON q.SupplierID = s.CompanyID
        ORDER BY q.OrderID DESC, q.QuotedTotal ASC`;

    app.connection.query(orderSQL, (err, orders) => {
        app.connection.query("SELECT * FROM COMPANY_MVP WHERE CompanyType='Contractor'", (err2, contractors) => {
            app.connection.query(quoteSQL, (err3, quotes) => {
                res.render('orders/index', {
                    orders: orders || [],
                    contractors: contractors || [],
                    quotes: quotes || [],
                    errorMsg: errorMsg
                });
            });
        });
    });
}

// 1. READ: View My Orders list & Compare Quotes
app.get(['/', ''], (req, res) => {
    renderOrders(req, res);
});

// 2. CREATE: Create Order/new RFQ as 'Draft' status
app.post('/add', (req, res) => {
    let SQL = "INSERT INTO ORDER_MVP (ContractorID, OrderDate, Status) VALUES (?, ?, 'Draft')";
    app.connection.execute(SQL, [req.body.ContractorID, req.body.OrderDate], (err) => {
        renderOrders(req, res, err ? err.sqlMessage : null);
    });
});

// 3. UPDATE: Edit Order date (Only when Status = 'Draft')
app.post('/edit/:id', (req, res) => {
    let SQL = "UPDATE ORDER_MVP SET OrderDate=? WHERE OrderID=? AND Status='Draft'";
    app.connection.execute(SQL, [req.body.OrderDate, req.params.id], (err) => {
        renderOrders(req, res, err ? err.sqlMessage : null);
    });
});

// 4. DELETE: Delete Order/RFQ (Only delete before sending to Supplier: Status = 'Draft')
app.post('/delete/:id', (req, res) => {
    let SQL = "DELETE FROM ORDER_MVP WHERE OrderID=? AND Status='Draft'";
    app.connection.execute(SQL, [req.params.id], (err) => {
        renderOrders(req, res, err ? err.sqlMessage : null);
    });
});

// 5. SEND TO SUPPLIERS: Finalizing RFQ -> Status changing from 'Draft' to 'Pending' (Delete/edit function is locked)
app.post('/send/:id', (req, res) => {
    let SQL = "UPDATE ORDER_MVP SET Status='Pending' WHERE OrderID=? AND Status='Draft'";
    app.connection.execute(SQL, [req.params.id], (err) => {
        renderOrders(req, res, err ? err.sqlMessage : null);
    });
});

// 6. STORY (d): Contractor chọn Báo giá của Supplier -> Duyệt Order ('Approved')
app.post('/approve-quote/:quoteID/:orderID', (req, res) => {
    app.connection.execute("UPDATE QUOTE_MVP SET Status='Accepted' WHERE QuoteID=?", [req.params.quoteID], () => {
        app.connection.execute("UPDATE QUOTE_MVP SET Status='Rejected' WHERE OrderID=? AND QuoteID<>?", [req.params.orderID, req.params.quoteID], () => {
            app.connection.execute("UPDATE ORDER_MVP SET Status='Approved' WHERE OrderID=?", [req.params.orderID], () => {
                renderOrders(req, res);
            });
        });
    });
});

// --- CRUD 3: ORDER_ITEM_MVP (Cart & Checkout Items inside 1 Order) ---
function renderOrderItems(req, res, orderID) {
    let orderSQL = "SELECT *, (Status = 'Draft') AS isDraft FROM ORDER_MVP WHERE OrderID=?";
    let itemSQL = `
        SELECT oi.*, m.MaterialName, (oi.Quantity * oi.UnitPrice) AS SubTotal
        FROM ORDER_ITEM_MVP oi
        JOIN MATERIAL_MVP m ON oi.MaterialID = m.MaterialID
        WHERE oi.OrderID=?`;

    app.connection.query(orderSQL, [orderID], (err, orderData) => {
        if (!orderData || orderData.length === 0) return renderOrders(req, res, "Order not found");
        app.connection.query(itemSQL, [orderID], (err2, items) => {
            app.connection.query("SELECT * FROM MATERIAL_MVP", (err3, materials) => {
                res.render('orders/items', {
                    order: orderData[0],
                    items: items || [],
                    materials: materials || []
                });
            });
        });
    });
}

app.get('/:id/items', (req, res) => {
    renderOrderItems(req, res, req.params.id);
});

app.post('/:id/items/add', (req, res) => {
    let orderID = req.params.id;
    let { MaterialID, Quantity } = req.body;
    app.connection.query("SELECT BasePrice FROM MATERIAL_MVP WHERE MaterialID=?", [MaterialID], (err, mat) => {
        let price = (mat && mat.length > 0) ? mat[0].BasePrice : 0;
        let SQL = "INSERT INTO ORDER_ITEM_MVP (OrderID, MaterialID, Quantity, UnitPrice) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Quantity=?";
        app.connection.execute(SQL, [orderID, MaterialID, Quantity, price, Quantity], () => {
            renderOrderItems(req, res, orderID);
        });
    });
});

app.post('/:id/items/delete/:materialID', (req, res) => {
    let SQL = "DELETE FROM ORDER_ITEM_MVP WHERE OrderID=? AND MaterialID=?";
    app.connection.execute(SQL, [req.params.id, req.params.materialID], () => {
        renderOrderItems(req, res, req.params.id);
    });
});

module.exports = app;