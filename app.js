const express = require('express');
const mysql = require('mysql');


// Create connection
const db = mysql.createConnection({
    host     : 'bh6rjua5tknrusidykrp-mysql.services.clever-cloud.com',
    user     : 'us4dxseymiczsz0b',
    password : 'Rqhy6cPccyfynMCMmPTa',
    database : 'bh6rjua5tknrusidykrp'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index')
})

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.post('/createtable', (req, res) => {
    if (!req.body.table) res.send('text field empty');
    let sql = `CREATE TABLE ${req.body.table}(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`${req.body.table} table created...`);
    });
});

// Insert post 
app.post('/addpost', (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.table) res.send('text field empty');
    let post = {
        title: req.body.title,
        body: req.body.body
    };
    let sql = `INSERT INTO ${req.body.table} SET ?`;
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});

// Select posts
app.post('/getposts', (req, res) => {
    let sql = `SELECT * FROM ${req.body.table}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});