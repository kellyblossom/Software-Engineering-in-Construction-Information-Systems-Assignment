const express = require('express');
const db = require('mysql2');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');

const app = express();

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false,
    partialsDir: 'views'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('buildsync_secret'));
app.use(express.static("public"));
app.use(express.static("node_modules/htmx.org/dist"));
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("node_modules/bootstrap/dist/js"));
app.use(express.static("node_modules/bootstrap-icons/font"));

const configs = require('./config');
const connection = db.createConnection(configs.db);

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database: ", err);
        process.exit();
    } else {
        console.log("Connected to BuildSync database!");
    }
});

// Route Main page & Project Manager Dashboard (D3, D2 on Sitemap)
app.get('/', (req, res) => {
    let statsSQL = `
        SELECT 
            (SELECT COUNT(*) FROM MATERIAL_MVP) AS totalMaterials,
            (SELECT COUNT(*) FROM ORDER_MVP) AS totalOrders,
            (SELECT COUNT(*) FROM QUOTE_MVP) AS totalQuotes,
            (SELECT COUNT(*) FROM COMPANY_MVP) AS totalCompanies`;
    let trackingSQL = `
        SELECT o.OrderID, o.OrderDate, o.Status, c.CompanyName AS ContractorName,
               (SELECT COUNT(*) FROM QUOTE_MVP q WHERE q.OrderID = o.OrderID) AS QuoteCount
        FROM ORDER_MVP o
        LEFT JOIN COMPANY_MVP c ON o.ContractorID = c.CompanyID
        ORDER BY o.OrderID DESC LIMIT 10`;

    connection.query(statsSQL, (err, stats) => {
        connection.query(trackingSQL, (err2, orders) => {
            const viewData = {
                title: 'Build-Sync Procurement Platform',
                stats: stats ? stats[0] : {},
                orders: orders || []
            };
            if (req.get("HX-Request")) {
                res.render('dashboard', viewData);
            } else {
                res.render('index', viewData);
            }
        });
    });
});

// Router following Sitemap
const materials = require('./routes/materials');
materials.connection = connection;
app.use('/materials', materials);

const orders = require('./routes/orders');
orders.connection = connection;
app.use('/orders', orders);

const supplier = require('./routes/supplier');
supplier.connection = connection;
app.use('/supplier', supplier);

const companies = require('./routes/companies');
companies.connection = connection;
app.use('/companies', companies);

app.listen(80, function () {
    console.log('Build-Sync Web Server listening on port 80!');
});