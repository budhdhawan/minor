const express = require('express');
const mysql = require('mysql');


// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '' ,
  database: 'login',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Create an Express app
const app = express();

app.get("/",function(req,res){
    res.sendfile(__dirname + "/login.html")
})

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                res.send('Successfully Logged in');
                res.redirect('/index.html'); // add this line to redirect to the new HTML page
            } else {
                res.send('Incorrect Username and/or Password!');
            }           
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});


 

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 