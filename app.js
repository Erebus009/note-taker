
const express = require('express');
const fs = require('fs');
const path = require('path');
var uuid = require('uuid')
// Databse const to make it easier to read.

const notes = require('./db/db.json');

// PORT server will open ti display
const PORT = 3000;
// Calls the express function to a const to be used in Methods (post,get,fetch...etc...etc)
const app = express();




// handles data parsing.
app.use(express.urlencoded({extended:true}));
app.use(express.json())






// Set up the page to use public folder assets from one path file instead of naming all the paths one by one.
app.use(express.static('public'));

app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname, '/public/'))
})


// GET method to display notes.html when get started button is clicked and wants to request http://localhost:3000/notes
app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));

})


//GET method to display db.json database 
app.get('/api/notes/', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json', ))

})


// post save note as json into database file on db.json.
app.post('/api/notes/',(req,res) => {
    
    const {title,text} = req.body;

    if(title && text){
        const Note = {
            title,
            text,
            id: uuid.v4()
        }
   
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
        if(err){
            console.log(err);
        } else {
            const newNote = JSON.parse(data);
            newNote.push(Note);

            
            fs.writeFile('./db/db.json',
            JSON.stringify(newNote,null,2),
            (writeErr) => 
                writeErr
                ? console.error(writeErr)
                : console.info('Created new note')
            );


        }
    });
    const response = {
        staus: 'success',
        body : Note,
    };
    console.log(response);
        res.status(201).json(response)
    }else {
        res.status(500).json('Error in saving note to database');
}
}); 



app.get('/api/notes/:id', (req, res) => {
    res.json(notes[req.params.id]);
});
   

app.delete("/api/notes/:id", (req,res) => {
    notes.splice(req.params.id, 1);
    console.log("Deleted note with id "+req.params.id);
})


// listens to port for conenctions and logs out for easy access with ctrl+click for user agent.
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
