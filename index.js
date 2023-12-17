
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rhuqckv.mongodb.net/?retryWrites=true&w=majority`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rhuqckv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
    const bookingCollection = client
      .db("eventDb")
      .collection("events");


    const userCollection = client
      .db("userDB")
      .collection("users");


    app.get("/booking", async (req, res) => {
      const query = {};
      const email = req.query.email;
      if (email) {
        query.email = email
      }
      const courser = bookingCollection.find(query);
      const result = await courser.toArray();
      res.send(result);
    });

    app.get("/user", async (req, res) => {
      const query = {};
      const email = req.query.email;
      if (email) {
        query.email = email
      }
      const courser = userCollection.find(query);
      const result = await courser.toArray();
      res.send(result);
    });

    app.post("/booking", async (req, res) => {
      const newEvent = req.body;
      console.log("new event :", newEvent);
      const result = await bookingCollection.insertOne(newEvent);
      res.send(result);
    });

    app.post("/user", async (req, res) => {
      const newUser = req.body;
      console.log("new user :", newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result);
    });


    console.log("Database Connected!");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();
app.get("/", (req, res) => {
  res.status("project-blog-server-a11 running on port", port);
});

app.listen(port, () => {
  console.log("project-server running on ", port);
});