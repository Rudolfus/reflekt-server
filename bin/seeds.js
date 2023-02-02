const mongoose = require("mongoose");
const User = require("../models/User.model");
const Question = require("../models/Question.model");
const Answer = require("../models/Answer.model");

const MONGO_URI =
  "mongodb+srv://rudi:123456qweR@cluster0.5gejlcs.mongodb.net/?retryWrites=true&w=majority";

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
  {
    name: "Leo",
    email: "Leo@posteo.com",
    password: "Leo123",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Franziska",
    email: "Franziska@posteo.com",
    password: "Franziska123",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60",
  },
  {
    name: "Joel",
    email: "Joel@posteo.com",
    password: "Joel123",
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
    question: "How many drinks have I had today?",
    topic: "drinking",
  },
  {
    question: "For what I am grateful for today is...",
    topic: "gratitude",
  },
  {
    question: "What am I good at?",
    topic: "self-care",
    isPublic: true,
    answerCount: 34,
  },
  {
    question: "What is good for me?",
    topic: "self-care",
    isPublic: true,
    answerCount: 23,
  },
  {
    question: "What is one thing I can do today to make myself feel better?",
    topic: "self-care",
    isPublic: true,
    answerCount: 23,
  },
  {
    question: "What is one thing I can do today to make myself feel better?",
    topic: "self-care",
  },
  {
    question: "How many ciagarettes do I smoke during the day?",
    topic: "smoking",
    isPublic: true,
    answerCount: 56,
  },
  {
    question: "How many cigarettes have I smoked today?",
    topic: "smoking",
  },
  {
    question: "In which situations did I smoke today?",
    topic: "smoking",
    isPublic: true,
    answerCount: 12,
  },
  {
    question: "Did I smoke today?",
    topic: "smoking",
  },
  {
    question: "Do I feel better or worse after smoking?",
    topic: "smoking",
  },
  {
    question:
      "How did it make me feel the last time after having finished a smoke?",
    topic: "smoking",
    isPublic: true,
    answerCount: 8,
  },
  {
    question: "What do I eat during the day?",
    topic: "eating",
    isPublic: true,
    answerCount: 59,
  },
  {
    question: "How many meals did I have today?",
    topic: "eating",
    isPublic: true,
    answerCount: 6,
  },
  {
    question: "What emotions do I connect with eating?",
    topic: "eating",
    isPublic: true,
    answerCount: 27,
  },
  {
    question: "Why do I get up early in the morning?",
    topic: "motivation",
    isPublic: true,
    answerCount: 18,
  },
  {
    question: "Who are the people that I look up to?",
    topic: "motivation",
    isPublic: true,
    answerCount: 23,
  },
  {
    question: "What am I proud of today?",
    topic: "motivation",
    isPublic: true,
    answerCount: 50,
  },
  {
    question: "What do I not like about my job as an accountant?",
    topic: "job",
    isPublic: true,
    answerCount: 4,
  },
  {
    question: "What situation at work made me content?",
    topic: "job",
    isPublic: true,
    answerCount: 1,
  },
  {
    question: "When do I take time to talk to my mother?",
    topic: "relationship",
    isPublic: true,
    answerCount: 7,
  },
  {
    question: "Am I spending enough time with my friends?",
    topic: "relationship",
    isPublic: true,
    answerCount: 24,
  },
  {
    question: "Am I spending enough time with my kids?",
    topic: "relationship",
    isPublic: true,
    answerCount: 11,
  },
  {
    question:
      "What is one thing I can do today to make someone else feel better?",
    topic: "kindness",
  },
  {
    question:
      "What is one thing I can do today to make the world a better place?",
    topic: "kindness",
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