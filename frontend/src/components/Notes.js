import React, { useContext, useState, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const noteCtx = useContext(noteContext);
  const { notes, getNote, editNote } = noteCtx;
  const navigate = useNavigate();

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      getNote();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated Successfully", "success");
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container py-4">
        <h1 className="text-center fw-bold mb-1">📝 Manage Your Notes</h1>
        <p className="text-center text-muted mb-4">
          Effortlessly create, edit, and organize your notes.
        </p>

        <AddNote showAlert={props.showAlert} />

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className="container-fluid">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button
                  disabled={note.etitle.length < 5 || note.edescription.length < 5}
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>

        <h2 className="mt-5">Your Notes</h2>
        <div className="row">
          {notes.length === 0 ? (
            <p className="text-muted">No notes to display.</p>
          ) : (
            notes.map((note) => (
              <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;
