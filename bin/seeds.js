const mongoose = require("mongoose");
const User = require("../models/User.model");
const Question = require("../models/Question.model");
const Answer = require("../models/Answer.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/reflekt-server";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

// User.collection.drop(); // Warning, drops author collection
// Question.collection.drop(); // Warning, drops question collection
// Answer.collection.drop(); // Warning, drops answer collection

const users = [
  {
    name: "Camille",
    email: "camille@posteo.com",
    password: "Camilla123",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Nadja",
    email: "nadja@posteo.com",
    password: "Nadja123",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Ralphi",
    email: "ralphi@posteo.com",
    password: "Ralphi123",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
  },
];

const questions = [
  {
    question: "What am I grateful for today?",
    topic: "self-care",
    isPublic: true,
    answerCount: 0,
  },
  {
    question: "How many ciagarettes do I smoke during the day?",
    topic: "smoking",
    isPublic: true,
    answerCount: 1,
  },
  {
    question: "What do I eat during the day",
    topic: "eating",
    isPublic: true,
    answerCount: 2,
  },
  {
    question: "Why do I get up early in the morning?",
    topic: "motivation",
    isPublic: true,
    answerCount: 3,
  },
  {
    question: "What do I not like about my job as an accountant?",
    topic: "job",
    isPublic: true,
    answerCount: 4,
  },
  {
    question: "When do I take time to talk to my mother?",
    topic: "relationship",
    isPublic: true,
    answerCount: 5,
  },
];

const answers = [
    {
        "answer": "I don't know",
        "isPublic": true,
        "createdAt": "2023-01-25T21:09:11.364Z",
        "updatedAt": "2023-01-25T21:09:11.364Z",
        "__v": 0
    },
    {
        "answer": "I still don't know",
        "isPublic": false,
        "createdAt": "2023-01-25T21:09:11.364Z",
        "updatedAt": "2023-01-25T21:09:11.364Z",
        "__v": 0
    },
    {
        "answer": "I still don't know",
        "isPublic": true,
        "createdAt": "2023-01-25T21:09:11.364Z",
        "updatedAt": "2023-01-25T21:09:11.364Z",
        "__v": 0
    },
    {
        "answer": "I still don't know",
        "isPublic": false,
        "createdAt": "2023-01-25T21:09:11.364Z",
        "updatedAt": "2023-01-25T21:09:11.364Z",
        "__v": 0
    },
    {
        "answer": "I still don't know",
        "isPublic": true,
        "createdAt": "2023-01-25T21:09:11.364Z",
        "updatedAt": "2023-01-25T21:09:11.364Z",
        "__v": 0
    }
];


const userPromise = User.create(users);
const questionPromise = Question.create(questions);
const answerPromise = Answer.create(answers);

Promise.all([userPromise, questionPromise, answerPromise])
  .then((result) => {
    const usersCreated = result[0];
    const questionsCreated = result[1];
    const answersCreated = result[2];
    console.log(`Number of users created... ${usersCreated.length} `);
    console.log(`Number of questions created... ${questionsCreated.length} `);
    console.log(
      `Number of answers created... ${answersCreated.length} `
    );

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((e) => console.log("error seeding data in DB....", e));