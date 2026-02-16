import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import api from "../services/api";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/");
      // Transform MongoDB data to match frontend expectations
      const transformedNotes = response.data.map(note => ({
        id: note._id,
        title: note.title,
        content: note.content,
        category: note.category,
        createAt: new Date(note.createdAt).toLocaleDateString()
      }));
      setNotes(transformedNotes);
    }
    catch (error) {
      console.error("Error fetching notes:", error);
    }
  };


 
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, noteId: null, noteTitle: '' });

  const openDeleteModal = (id, title) => {
    setDeleteModal({ isOpen: true, noteId: id, noteTitle: title });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, noteId: null, noteTitle: '' });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/delete/${deleteModal.noteId}`);
      setNotes(notes.filter((note) => note.id !== deleteModal.noteId));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  const handleDelete = (id, title) => {
    openDeleteModal(id, title);
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Notes Section */}
      <div className="py-8">
        <NoteList notes={filteredNotes} onDelete={handleDelete} />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-in">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Delete Note?</h2>
            
            {/* Message */}
            <p className="text-gray-600 text-center mb-2">
              Are you sure you want to delete
            </p>
            <p className="text-gray-900 font-semibold text-center mb-6 px-4">
              "{deleteModal.noteTitle}"?
            </p>
            <p className="text-sm text-gray-500 text-center mb-8">
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/notes/add")}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 flex items-center justify-center group cursor-pointer z-50"
        title="Add New Note"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default Home;
