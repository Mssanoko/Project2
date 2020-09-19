// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const invoiceTemplate = require("../public/views/invoices.handlebars"); // ADDED
const exphbs = require("express-handlebars"); // ADDED
const express = require("express"); // ADDED

var app = express(); // ADDED

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

app.engine("handlebars", exphbs({ defaultLayout: "main" })); // ADDED
app.set("view engine", "handlebars"); // ADDED

module.exports = function(app) {
  app.get("/index", (req, res) => {
    res.render("index");
  });

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // app.get("/sign-up", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  // });
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/account");
    }
    res.sendFile(path.join(__dirname, "../public/log-in.html"));
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/account", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });
  app.get("/view-clients", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/view-clients.html"));
  });
  app.get("/add-a-client", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/add-a-client.html"));
  });
  app.get("/create-invoice", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/create-invoice.html"));
  });
  app.get("/view-invoices", isAuthenticated, (req, res) => {
    
    // res.sendFile(path.join(__dirname, "../public/view-invoices.html"));
    res.render("invoices", { invoices: [{id: "1", invoice: "2" }] }); // CHANGED
  });

  // app.get("/product-services", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/product-services.html"));
  // });
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
  app.get("/bill-estimate", isAuthenticated, (req, res) => {
    // mock data to pass to /bill-estimate page using handlebars
    var bills = {
        bills: [
            {
                name: "Project1",
                unit_amount: 2000,
                quantity: 1,
            },
            {
                name: "Project12",
                unit_amount: 200,
                quantity: 10,
            },
        ]
    };
    // create handlebars below with res.render()
    res.sendFile(path.join(__dirname, "../public/bill-estimate.html"));
  });
};
