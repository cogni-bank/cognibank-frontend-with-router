var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.end("HI!");
});

app.post("/loginUser", function(req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  console.log(req.path);
  var user = {
    userId: "null",
    userName: "null",
    password: "null",
    email: "praga@gmail.com",
    phone: "2568937230498",
    otpCode: "null"
  };
  //res.write("user")
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.write(JSON.stringify(user));
  res.end();
});

app.post("/emailOrPhone", function(req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  console.log(req.path);
  res.end("yes");
});

app.post("/challenge", function(req, res) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = " + user_name + ", password is " + password);
  console.log(req.path);
  res.end("yes");
});

app.post("/registerUser", function(req, res) {
  // create a user by calling User management microservice
  // Get the userID and create user security questions by calling related microservice
  // if user is created successfully return a true message
  // 400 when the request is wrong. response -> ["error 1", "error 2"]
  // 406 when username is already registered
  // 4xx email is already registered by a user ????? not implemented in user management
  // 4xx mobile is already registered by a user ????? not implemented in user management
  console.log(req.body);
  res.end('{"registered": true}');
});

app.post("/getSecurityQuestions", function(req, res) {
  var user_name = req.body.user;
  console.log("User name = " + user_name);
  console.log(req.path);

  var questions = {
    id: 1,
    que: "What is you first cars?"
  };
  //res.write("user")
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.write(JSON.stringify(questions));

  res.end();
});
app.post("/securityQuestions", function(req, res) {
  console.log(req.body.user);
  res.end("What is your mother's name?");
});

app.listen(8090, function() {
  console.log("Started on PORT 8090");
});
