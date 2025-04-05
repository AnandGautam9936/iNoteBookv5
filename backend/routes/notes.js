const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { query, validationResult, body } = require("express-validator");

//Get all the notes Notes using: GET "/api/notes/fetchAllNotes" Login required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Adding new Note using: POST "/api/notes/addnote" Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title!").isLength({ min: 3 }),
    body("description", "Enter a valid description!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

//Update the existing Notes using: Put "/api/notes/fetchAllNotes" Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

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

    //Check if the note exist and if that is of the correct user then update the note

    let note = await Notes.findById(req.params.id);

    if (!note) {
      res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

//Update the existing Notes using: DELETE "/api/notes/deletenote" Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
