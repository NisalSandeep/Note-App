const Note = require("../Model/Note");

async function addNote(req, res) {
  try {
    const { title, content, category } = req.body;

    const newNote = await Note.create({
      title,
      content,
      category,
    });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({}).sort({ createdAt: -1 }); // Sort by creation date (newest first)
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteNote(req, res) {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateNote(req, res) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }, // return the updated document
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
};
