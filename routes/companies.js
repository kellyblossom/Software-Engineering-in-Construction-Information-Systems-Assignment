const express = require('express');
const app = express.Router();

function renderCompanies(req, res) {
    app.connection.query("SELECT * FROM COMPANY_MVP ORDER BY CompanyID DESC", (err, companies) => {
        res.render('companies/index', { companies: companies || [] });
    });
}

app.get(['/', ''], (req, res) => {
    renderCompanies(req, res);
});

app.post('/add', (req, res) => {
    let SQL = "INSERT INTO COMPANY_MVP (CompanyName, TaxCode, CompanyType, Address) VALUES (?, ?, ?, ?)";
    let params = [req.body.CompanyName, req.body.TaxCode, req.body.CompanyType, req.body.Address];
    app.connection.execute(SQL, params, () => {
        renderCompanies(req, res);
    });
});

app.post('/edit/:id', (req, res) => {
    let SQL = "UPDATE COMPANY_MVP SET CompanyName=?, TaxCode=?, Address=? WHERE CompanyID=?";
    app.connection.execute(SQL, [req.body.CompanyName, req.body.TaxCode, req.body.Address, req.params.id], () => {
        renderCompanies(req, res);
    });
});

app.post('/delete/:id', (req, res) => {
    app.connection.execute("DELETE FROM COMPANY_MVP WHERE CompanyID=?", [req.params.id], () => {
        renderCompanies(req, res);
    });
});

module.exports = app;