const express = require('express');
const app = express.Router();

function renderMaterials(req, res, errorMsg = null) {
    let keyword = req.query.keyword ? `%${req.query.keyword}%` : '%';
    let catFilter = req.query.categoryID ? "AND m.CategoryID = ?" : "";
    let supFilter = req.query.supplierID ? "AND m.SupplierID = ?" : "";

    let params = [keyword];
    if (req.query.categoryID) params.push(req.query.categoryID);
    if (req.query.supplierID) params.push(req.query.supplierID);

    let SQL = `
        SELECT m.*, c.CategoryName, s.CompanyName AS SupplierName
        FROM MATERIAL_MVP m
        LEFT JOIN CATEGORY_PHASE2 c ON m.CategoryID = c.CategoryID
        LEFT JOIN COMPANY_MVP s ON m.SupplierID = s.CompanyID
        WHERE m.MaterialName LIKE ? ${catFilter} ${supFilter}
        ORDER BY m.MaterialID DESC`;

    app.connection.query(SQL, params, (err, materials) => {
        app.connection.query("SELECT * FROM CATEGORY_PHASE2", (err2, categories) => {
            app.connection.query("SELECT * FROM COMPANY_MVP WHERE CompanyType='Supplier'", (err3, suppliers) => {
                res.render('materials/index', {
                    materials: materials || [],
                    categories: categories || [],
                    suppliers: suppliers || [],
                    errorMsg: errorMsg
                });
            });
        });
    });
}

// READ & SEARCH
app.get(['/', ''], (req, res) => {
    renderMaterials(req, res);
});

// CREATE Material
app.post('/add', (req, res) => {
    let SQL = "INSERT INTO MATERIAL_MVP (SupplierID, CategoryID, MaterialName, BasePrice) VALUES (?, ?, ?, ?)";
    let params = [req.body.SupplierID, req.body.CategoryID, req.body.MaterialName, req.body.BasePrice];
    app.connection.execute(SQL, params, (err) => {
        renderMaterials(req, res, err ? err.sqlMessage : null);
    });
});

// UPDATE Material & BasePrice
app.post('/edit/:id', (req, res) => {
    let SQL = "UPDATE MATERIAL_MVP SET MaterialName=?, CategoryID=?, BasePrice=? WHERE MaterialID=?";
    let params = [req.body.MaterialName, req.body.CategoryID, req.body.BasePrice, req.params.id];
    app.connection.execute(SQL, params, (err) => {
        renderMaterials(req, res, err ? err.sqlMessage : null);
    });
});

// DELETE Material
app.post('/delete/:id', (req, res) => {
    let SQL = "DELETE FROM MATERIAL_MVP WHERE MaterialID=?";
    app.connection.execute(SQL, [req.params.id], (err) => {
        renderMaterials(req, res, err ? err.sqlMessage : null);
    });
});

module.exports = app;