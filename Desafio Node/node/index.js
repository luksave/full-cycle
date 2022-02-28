const { json } = require('express');
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("./"));

const config = {
    host: 'db',
    user: 'root',
    password: '123',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlCreate = `CREATE TABLE people(id int not null auto_increment, name varchar(255), primary key(id))`
connection.query(sqlCreate)

const sqlInsert = `INSERT INTO people(name) values('Lucas')`
connection.query(sqlInsert)

connection.end()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    const selection = `SELECT * FROM people`
    
    let resultsQuery = [];

    var query = connection.query(selection, function (error, results, fields) {

        if(results.length){
            for(var i = 0; i<results.length; i++ ){
                resultsQuery.push(results[i]);
            }          
        }
 
        console.log(resultsQuery);

        res.send('<h1>Full Cycle Rocks!!</h1>'
                + JSON.stringify(resultsQuery))

    });

    connection.end()

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})