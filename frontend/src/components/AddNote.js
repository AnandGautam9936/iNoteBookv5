import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (note.title.length < 5 || note.description.length < 5) {
      setErrors({
        title: note.title.length < 5 ? "Title must be at least 5 characters" : "",
        description: note.description.length < 5 ? "Description must be at least 5 characters" : "",
      });
      return;
    }

    addNote(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully", "success");

    setNote({ title: "", description: "", tag: "" });
    setErrors({ title: "", description: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

    // Live validation
    if (e.target.name === "title" && e.target.value.length >= 5) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
    if (e.target.name === "description" && e.target.value.length >= 5) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  return (
    <div className="container my-4 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-center fw-bold mb-3">➕ Add New Note</h2>
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            id="title"
            name="title"
            placeholder="Enter note title..."
            value={note.title}
            onChange={onChange}
            required
          />
          {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
        </div>

        <div className="col-12">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            name="description"
            rows="3"
            placeholder="Enter note description..."
            value={note.description}
            onChange={onChange}
            required
          />
          {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
        </div>

        <div className="col-12">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter note tag..."
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleClick}
            style={{ opacity: 0.9 }}
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
