const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const pass = process.env.DB_PASS

// Connection URL
const url = `mongodb+srv://Sergi:${pass}@cluster0-ej6db.mongodb.net/nodeBooks?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(url, {useUnifiedTopology: true});

const app = express();

//Set the templating engine
app.set('view engine', 'ejs');

//Set where our views reside (folder name)
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }))

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db('nodeBooks');

  const booksCollection = db.collection('books');

  app.get('/', (req, res) => {
    res.render('index')
  })
  
  app.post('/books', (req, res) => {
    console.log(req.body);
    booksCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.error(error))
  })

  // client.close();
});




// app.use((req, res, next) => {
//     const user = 'eeSergi';
//     res.render('index', {
//         user: user
//     })
// });



app.listen(3000);