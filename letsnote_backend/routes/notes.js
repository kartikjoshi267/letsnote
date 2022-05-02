const { Router } = require('express');
const Notes = require('../models/Notes');
const authentication = require('../middleware/authentication');
const { default: mongoose } = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = Router();


// ROUTE 1 : Fetch all notes for a user by GET : /api/notes/fetchnotes . Login Required
router.get('/fetchnotes', authentication, async (req, res) => {
    // Fetching all notes of a user using user's id
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).json(notes);
})

// ROUTE 2 : Add a notes by POST : /api/notes/addnote . Login Required
router.post('/addnote',
    [
        body('description', 'Description of the note cannot be empty').exists()
    ],
    authentication,
    async (req, res) => {
        // If field values are invalid, then send an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors });
        }

        try {
            // Else create a new note with the id of user
            const note = await Notes.create({
                user: req.user.id,
                title: req.body.title ? req.body.title : mongoose.Schema.defaultMaxListeners,
                description: req.body.description,
                tag: req.body.tag ? req.body.tag : mongoose.Schema.defaultMaxListeners,
            });

            res.status(200).json({ note });
        } catch (error) {
            return res.status(500).send({ error: "Internal Server error occured" });
        }
    });

// ROUTE 3 : Update an existing note by POST : /api/notes/updatenote/:id. Login Required
router.post('/updatenote/:id',
    authentication,
    async (req, res) => {
        try {
            const { title, description, tag } = await req.body;
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            const oldNote = await Notes.findById(req.params.id);
            if (!oldNote) {
                return res.status(404).send("Not Found!");
            }

            if (oldNote.user.toString() !== req.user.id) {
                return res.status(403).send("Forbidden Request");
            }

            const updateNote = await Notes.findByIdAndUpdate(req.params.id, newNote);
            res.status(200).json(updateNote);
        } catch (error) {
            return res.status(500).send({ error: "Internal Server error occured" });
        }
    });

// ROUTE 4 : Delete an existing note by DELETE : /api/notes/deletenote/:id. Login Required
router.delete('/deletenote/:id',
    authentication,
    async (req, res) => {
        try {
            const oldNote = await Notes.findById(req.params.id);
            if (!oldNote) {
                return res.status(404).json({error:"Not Found!"});
            }

            if (oldNote.user.toString() !== req.user.id) {
                return res.status(403).json({error:"Forbidden Request"});
            }

            const deleteNote = await Notes.findByIdAndDelete(req.params.id);
            res.status(200).json({"Deleted": "Deleted"});
        } catch (error) {
            return res.status(500).send({ error: "Internal Server error occured" });
        }
    });

module.exports = router;