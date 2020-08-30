const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');


//PORT for server
const PORT = process.env.PORT || 4000;


// Create app
const app = express();


// Simple Static Data Base only for simple test
const posts = {};

// Use body parser 
app.use(bodyParser.json());


// Method GET
app.get('/posts', (req, res) => {

    res.status(200).send(JSON.stringify(posts));

})


app.post('/posts', (req, res) => {
    const _id = randomBytes(4).toString('hex'); // 4 bytes 
    const { title } = req.body;

    // Has table for fast search by _id
    posts[_id] = { _id, title };

    //Status 201 is created  ok 
    res.status(201).send(JSON.stringify(posts[_id]));

});

app.listen(PORT, () => {
    console.info(`Listening in port ${PORT}`)
});