// importing the required modules
const express = require("express");
const bcrypt=require("bcrypt");

// initializing the app
const app = express();

// Setting the middleware
app.use(express.json()); // for parsing application/json

const users = [];

app.listen(3001, () => {
  console.log("listening in port 3001");
});

// Creating a new user
app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(1);
    const hashedPass = await bcrypt.hash(req.body.password, 1);
    // console.log(salt);
    console.log(hashedPass);
    const user = { name: req.body.name, password: hashedPass };
    users.push(user);
    res.status(200).json({ message: "user added successfully" });
  } catch (err) {
    res.status(500).send();
  }
});

// Authentication
app.post("/auth", async (req, res) => {
    const user = users.find((user) => user.name === req.body.name);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
  
    try {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.send("Allowed");
      } else {
        res.status(401).send("Not Allowed");
      }
    } catch (err) {
      res.status(500).send();
    }
  });
  
