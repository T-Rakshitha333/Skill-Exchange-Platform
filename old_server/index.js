// app.ts (or index.ts)
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import bodyParser from "body-parser";
import User from "./models/User.js"; // Import your User model
import Skill from "./models/Skill.js"; // Import your User model
import authRoutes from './routes/auth.js';
import nodemailer from "nodemailer";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const port = 3001;

// Connect to MongoDB using Mongoose
// mongoose.connect("mongodb://127.0.0.1:27017/skillxDB", {
//   useNewUrlParser: true,
// });

mongoose.connect("mongodb+srv://kancharapulokeshkumar:Th6LyyEJy5pu2rUG@cluster0.gdwqcnq.mongodb.net/skillxDB", {
  useNewUrlParser: true,
});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "text/plain" }));
app.use(express.json());
app.use(cors({ origin: true }));

// Set up session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

//Authentication using hashing
app.use('/', authRoutes);

app.get("/home", async (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object
    const currentUser = req.user; // Assuming you store user details in req.user
    const currentUserSkills = currentUser.skills;
    const currentUserInterests = currentUser.interests;
    const allUsers = await User.find(); // Fetch all users from the database

    //Matching Algorithm....
    User.find({
      $and: [
        { skills: { $elemMatch: { $in: currentUserInterests } } },
        { interests: { $elemMatch: { $in: currentUserSkills } } },
      ],
    })
      .then((matchedUsers) => {
        // console.log(currentUser.requests);
        if (currentUserSkills.length == 0 || currentUserInterests.length == 0) {
          const updatedAllUsers = allUsers.filter(
            (user) => user.username !== currentUser.username
          );
          res.render("home", { users: updatedAllUsers, currentUser }); // Render the 'users' template and pass the users data
        } else {
          res.render("home", { users: matchedUsers, currentUser });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  } else {
    res.redirect("/login");
  }
});

//my routes
app.get("/profile/:username", async(req, res) => {
  
  if (req.isAuthenticated()) {
    const currentUser = req.user;
    const requestedUser = req.params.username;
    const user = await User.findOne({ username: requestedUser });
    res.render("profile", { requestedUser: user , currentUser});
  } else {
    res.redirect("/login");
  }
});

app.get("/update-profile", async (req, res) => {
  if (req.isAuthenticated()) {
    const currentUser = req.user;
    res.render("update-profile", {
      currentUser
    });
  } else {
    res.redirect("/login");
  }
});

// app.put("/update-profile", (req, res) =>{
//   if (req.isAuthenticated()) {
//     const currentUser = req.user;
//     res.render("update-profile", {
//       currentUser
//     });
//   } else {
//     res.redirect("/login");
//   }
// })

app.post("/update-profile", (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object
    const currentUser = req.user;
    const skillsString = req.body.skills;
    const interestsString = req.body.interests;


    User.updateOne(
      { username: currentUser.username },
      { skills: skillArray, interests: interestArray }
    )
      .then(() => {
        console.log("User skills updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user skills:", error);
      });
  } else {
    res.redirect("/login");
  }
});


app.get("/quiz/:id", (req, res) =>{
  let quizId=req.params.id;
  
  res.render("quiz");
});

app.get("/selectskill", async(req, res)=>{
  const currentUser = req.user;

  const skillsData = await Skill.find({});

  if (req.isAuthenticated()) {
    res.render("selectskill", {
      currentUser, skillsData
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/playground", (req, res) =>{
  const currentUser = req.user;
  if (req.isAuthenticated()) {
    res.render("playground", {
      currentUser
    });
  } else {
    res.redirect("/login");
  }});

//   app.get("/lobby", (req, res) =>{
//     const currentUser = req.user;
//     if (req.isAuthenticated()) {
//       res.render("lobby", {
//         currentUser
//       });
//     } else {
//       res.redirect("/login");
//     }});

    app.get("/lobby", (req, res) =>{
      const currentUser = req.user;
      if (req.isAuthenticated()) {
        res.render("lobby", {
          currentUser
        });
      } else {
        res.redirect("/login");
      }});

//email notifications on clicking connect button on the user profile

// Assuming you have a route or endpoint for handling the "Connect" button click
// app.post("/sendEmail", async (req, res) => {
//   // Get the recipient's email address from the request (you can send it as a parameter or in the request body)
//   const recipientEmail = req.body.recipientEmail;
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "kancharapulokeshkumar@gmail.com",
//       pass: "ibvj mutj vabv nwwb", // Use the generated App Password here
//     },
//   });

//   // Create an email message
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: recipientEmail,
//     subject: "Connection Request",
//     text: "You have received a connection request from a user on our platform.",
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Error sending email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });

//   // if (req.isAuthenticated()) {
//   //   // Retrieve the user details from the request object
//   //   const currentUser = req.user; // Split the string by comma

//   //   const particularUser = await User.find({recipientEmail});
//   //   const newReq = particularUser.requests;
//   //   newReq.push(currentUser.username);
//   //   console.log(alreadyReq);
//   //   User.updateOne({ email: recipientEmail }, { requests: newReq})
//   //     .then(() => {
//   //       console.log("User skills updated successfully");
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error updating user skills:", error);
//   //     });
//   // } else {
//   //   res.redirect("/login");
//   // }
//   res.redirect("/home");
// });

// app.post("/reqaccept", (req, res) => {

// });

// app.post("/reqreject", (req, res) =>{

// });

app.get("/chat", async (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object

    res.render("chat", {currentUser: req.user});
  } else {
    res.redirect("/login");
  }
});

app.get("/playgrounds", (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object

    res.render("playgrounds", {currentUser: req.user});
  } else {
    res.redirect("/login");
  }
});

app.get("/room", (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object

    res.render("room", {currentUser: req.user});
  } else {
    res.redirect("/login");
  }
});

app.get("/feedback", (req, res) => {
  if (req.isAuthenticated()) {
    // Retrieve the user details from the request object

    res.render("feedback", {currentUser: req.user});
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
