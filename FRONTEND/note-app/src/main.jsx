import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx'
import Home from './pages/Home.jsx';
import NoteFormView from './components/NoteFormView.jsx';
import NoteFormEdit from './components/NoteFormEdit.jsx';
import NoteFormAdd from './components/NoteFormAdd.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes/:id" element={<NoteFormView />} />
        <Route path="/notes/edit/:id" element={<NoteFormEdit />} />
        <Route path="/notes/add" element={<NoteFormAdd />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
