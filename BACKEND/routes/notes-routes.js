const express = require('express');

const { getAllNotes, addNote, deleteNote , updateNote } = require('../controllers/notes-controller');

const router = express.Router();

router.get('/',getAllNotes); 
router.post('/add', addNote);
router.delete('/delete/:id', deleteNote);
router.put('/update/:id', updateNote);
 


module.exports = router;