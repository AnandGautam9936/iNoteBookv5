import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3 shadow-sm border-0 rounded">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title fw-bold">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2 text-danger"
                style={{ cursor: "pointer" }}
                title="Delete Note"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-2 text-primary"
                style={{ cursor: "pointer" }}
                title="Edit Note"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>

          <p className="card-text text-muted">{note.description}</p>

          {note.tag && (
            <span className="badge bg-secondary">{note.tag}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
