// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

//store stripe developer api here
let stripe_api_key = 'sk_test_51HRJhsHZ3fo1xYKD2O8DGS8HsVZPG03eM6u3LcQxlUTj71kc5Wwhdq5F7CZqleJfFSua7WPEBuLtDeH15P4nNbPf00tguq6Q7F';

const stripe = require('stripe')(stripe_api_key);

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  app.post("/api/add-a-client", (req, res) => {
    console.log(req.body);
    db.Client.create(req.body)
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.post("/api/create-invoice", (req, res) => {
    console.log(req.body);
    db.Invoice.create(req.body)
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // create api route for stripe
  app.post("/create-checkout-session", async (req, res) => {
    // pass in stripe values as req.body here  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/",
      cancel_url: "https://example.com/cancel",
    });
  
    res.json({ id: session.id });
  });
    
};
