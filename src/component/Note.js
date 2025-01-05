import React, { useState, useEffect } from 'react';
import Notecard from './Notecard';
import { Modal, Space, ColorPicker, Button } from 'antd';
import "../css/note.css";
import AddNew from './AddNew';

function Note() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    name: '', tags: '', description: '', date: new Date().toLocaleString(), color: '#ffffff',
  });
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Show modal for editing or adding a note
  const showModal = (noteIndex = null) => {
    setIsEditing(noteIndex !== null);
    setNewNote(noteIndex !== null ? { ...notes[noteIndex] } : { name: '', tags: '', description: '', date: new Date().toLocaleString(), color: '#ffffff' });
    setEditingNoteIndex(noteIndex);
    setIsModalOpen(true);
  };

  // Save new or edited note
  const handleOk = () => {
    const updatedNotes = isEditing ? notes.map((note, i) => i === editingNoteIndex ? newNote : note) : [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setIsModalOpen(false);
  };

  // Cancel editing or adding note
  const handleCancel = () => setIsModalOpen(false);

  // Handle input field changes
  const handleInputChange = (e) => setNewNote({ ...newNote, [e.target.name]: e.target.value });

  // Handle color picker change
  const handleColorChange = (color) => setNewNote({ ...newNote, color: color.toHexString() });

  // Delete note
  const handleDelete = (noteIndex) => {
    const updatedNotes = notes.filter((_, index) => index !== noteIndex);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Notes</h1>
      <div className="flex gap-4 h-full justify-center items-center flex-wrap">
        {notes.map((item, index) => (
          <div key={index}>
            <Notecard data={item} onClick={() => showModal(index)} onDelete={() => handleDelete(index)} />
          </div>
        ))}
        <AddNew show={showModal} />
      </div>
      <Modal title={isEditing ? "Edit Note" : "Add New Note"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered footer={[
        <Button key="back" onClick={handleCancel}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleOk}>{isEditing ? "Save" : "Add Note"}</Button>
      ]}>
        <form className="space-y-6 p-4">
          <div><label htmlFor="name">Note Name</label><input type="text" name="name" id="name" value={newNote.name} onChange={handleInputChange} required /></div>
          <div><label htmlFor="tags">Tags</label><input type="text" name="tags" id="tags" value={newNote.tags} onChange={handleInputChange} /></div>
          <div><label htmlFor="description">Description</label><textarea name="description" id="description" rows="4" value={newNote.description} onChange={handleInputChange}></textarea></div>
          <div><label>Choose Background Color</label><Space direction="vertical"><ColorPicker value={newNote.color} onChange={handleColorChange} open={open} onOpenChange={setOpen} /></Space></div>
        </form>
      </Modal>
    </div>
  );
}

export default Note;
