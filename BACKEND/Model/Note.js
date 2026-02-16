const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "General"
  }
}, {
  timestamps: true   // automatically adds createdAt & updatedAt
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
