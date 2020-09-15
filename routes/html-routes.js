// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/index", (req, res) => {
    res.render("index");
  });

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // app.get("/sign-up", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  // });
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/sign-up.html"));
  });
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/log-in.html"));
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/account", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/account.html"));
  });
  app.get("/viewClients", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/viewClients.html"));
  });
  app.get("/addaclient", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/add-a-client.html"));
  });
  app.get("/createInvoice", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/createInvoice.html"));
  });
  app.get("/viewInvoices", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/viewInvoices.html"));
  });

  // app.get("/product-services", isAuthenticated, (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/product-services.html"));
  // });
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
};
