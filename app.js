//jshint esversion: 6

const express = require("express");
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'tellme'
});

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log("mysql connected...");
});

app.get('/createtable', function(req, res){
  let sql = 'CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), email VARCHAR(50), password VARCHAR(20))';
  db.query(sql, function(err, result){
    if (err) throw err;
    console.log("Table created");
    res.send("User Table Created");
  });
});

//CREATE USER
app.get('/adduser1', function(req, res){
  let post = {
    name:"Varun",
    email: "varunsarpal271@gmail.com",
    password: "password"
  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, post, function(err, result){
    if (err) throw err;
    console.log("USER");
    res.send("User Inserted");
  });
});

app.get('/adduser2', function(req, res){
  let post = {
    name:"Sahil",
    email: "sahilsarpal@gmail.com",
    password: "password"
  };
  let sql = "INSERT INTO users SET ?";
  let query = db.query(sql, post, function(err, result){
    if (err) throw err;
    console.log("USER");
    res.send("User Inserted");
  });
});

// READ USER
app.get('/getusers', function(req, res){
  let sql = 'SELECT * FROM users;';
  let query = db.query(sql, function(err, results){
    if(err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.get('/getuser/:id', function(req, res){
  let sql = `SELECT * FROM users WHERE id = ${req.params.id};`;
  let query = db.query(sql, function(err, result){
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});


app.listen('3000', function(){
  console.log("Server Started 3000");
});
