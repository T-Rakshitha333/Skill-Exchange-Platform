// auth.js

import express from "express";
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import User from "../models/User.js"; // Import your User model

const router = express.Router();

// Set up session middleware
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
router.use(passport.initialize());
router.use(passport.session());

// Set up Passport Local Strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define your authentication routes
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.render("landing");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register"); 
});

router.post("/register", async (req, res) => {
  try {
    // Extract user information from the registration form
    const { username, password, email } = req.body;

    console.log(username, email, password);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Handle the case where the username is already taken
      // You can redirect to the registration page with an error message
      return res.redirect("/register");
    }

    // Create a new user with Passport.js and Mongoose
    User.register(new User({ username, email }), password, (err, user) => {
      if (err) {
        console.log(err);
        // Handle registration errors
        // You can redirect to the registration page with an error message
        return res.redirect("/register");
      }

      // If registration is successful, authenticate the user and redirect to the profile page
      passport.authenticate("local")(req, res, () => {
        res.redirect("/home");
      });
    });
  } catch (err) {
    // Handle other errors (e.g., database connection issues)
    res.status(500).send("Registration failed");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
