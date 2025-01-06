import React, { useState, useEffect } from 'react';
import Notecard from './Notecard';
import { Modal, Space, ColorPicker, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import "../css/note.css";
import AddNew from './AddNew';

function Note() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    name: '',
    tags: '',
    description: '',
    date: new Date().toLocaleString(),
    color: '#ffffff', // Default color is white
  });
  
  const [editingNoteIndex, setEditingNoteIndex] = useState(null); // Track the index of the note being edited
  const [isEditing, setIsEditing] = useState(false); // Determine if the user is editing or adding a new note

  // Load notes from localStorage if available
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Error parsing notes from localStorage", error);
        setNotes([]); // Fallback to empty array if JSON is invalid
      }
    } else {
      setNotes([]); // Initialize with an empty array if no notes are found
    }
  }, []);

  // Show modal for editing a specific note
  const showModal = (noteIndex = null) => {
    if (noteIndex !== null) {
      // Edit existing note
      setIsEditing(true);
      const note = notes[noteIndex];
      setEditingNoteIndex(noteIndex);
      setNewNote({
        ...note,
      });
    } else {
      // Add new note
      setIsEditing(false);
      setNewNote({
        name: '',
        tags: '',
        description: '',
        date: new Date().toLocaleString(),
        color: '#ffffff',
      });
    }

    setIsModalOpen(true);
  };

  // Save updated note (either add new or update existing)
  const handleOk = () => {
    let updatedNotes;

    if (isEditing) {
      // Edit existing note
      updatedNotes = [...notes];
      updatedNotes[editingNoteIndex] = newNote; // Update the note at the specified index
    } else {
      // Add new note
      updatedNotes = [...notes, newNote];
    }

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save to localStorage
    setIsModalOpen(false);
    setEditingNoteIndex(null);
    setNewNote({
      name: '',
      tags: '',
      description: '',
      date: new Date().toLocaleString(),
      color: '#ffffff', // Reset to default color
    });
  };

  // Cancel the edit and close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingNoteIndex(null);
  };

  // Handle changes to input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  // Handle changes to color picker
  const handleColorChange = (color) => {
    setNewNote({
      ...newNote,
      color: color.toHexString(), // Get the color as hex string
    });
  };

  // Delete a note
  const handleDelete = (noteIndex) => {
    const updatedNotes = notes.filter((_, index) => index !== noteIndex);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes)); // Save to localStorage
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">My Notes</h1>

      <div className="flex gap-4 h-full justify-center items-center">
        {notes?.map((item, index) => {
          return (
            <Notecard
              key={index}
              data={item}
              onClick={() => showModal(index)} // Trigger modal on click for editing
              onDelete={() => handleDelete(index)} // Trigger delete on click
            />
          );
        })}

        <AddNew show={showModal} /> {/* Button or component to trigger "Add New Note" modal */}

        <Modal
          title={isEditing ? "Edit Note" : "Add New Note"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          width={600}
          bodyStyle={{ padding: '20px' }}
          footer={[
            <Button key="back" onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400">
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk} className="bg-blue-500 hover:bg-blue-600">
              {isEditing ? "Save Changes" : "Add Note"}
            </Button>,
          ]}
        >
          <div className="relative w-full h-full">
            <form className="space-y-6 p-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Note Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-white border border-gray-300 rounded-lg shadow-md w-full p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Note Name"
                  value={newNote.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="tags" className="block text-lg font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className="bg-white border border-gray-300 rounded-lg shadow-md w-full p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Urgent, Personal"
                  value={newNote.tags}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="bg-white border border-gray-300 rounded-lg shadow-md w-full p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your note description here"
                  value={newNote.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700">Choose Background Color</label>
                <Space direction="vertical" className="w-full">
                  <ColorPicker
                    value={newNote.color}
                    onChange={handleColorChange}
                    open={open}
                    onOpenChange={setOpen}
                    showText={() => (
                      <span style={{ color: newNote.color }} className="font-medium">
                        {`Selected Color: ${newNote.color}`}
                      </span>
                    )}
                  />
                </Space>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Note;
