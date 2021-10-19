const { json } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path')
// PORT server will open ti display
const PORT = 3000;
// Calls the express function to a const to be used in Methods (post,get,fetch...etc...etc)
const app = express();
// handles data parsing.
app.use(express.urlencoded({extended:true}));
app.use(express.json())

// Set up the page to use public folder assets from one path file instead of naming all the paths one by one.
app.use(express.static('public'));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, '/public/'))
})


// GET method to display notes.html when get started button is clicked and wants to request http://localhost:3000/notes
app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));

})
// GEt mothod to display notes database API
app.get('/api/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, './db/db.json'))
})






// listens to port and logs out for easy access with ctrl+click.
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})