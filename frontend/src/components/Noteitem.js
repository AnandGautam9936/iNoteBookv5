import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <div className="card my-2 flex-fill shadow-sm border-0 rounded">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold">{note.title}</h5>
            <div className="ms-2">
              <i
                className="fa-solid fa-trash mx-1 text-danger"
                style={{ cursor: "pointer" }}
                title="Delete Note"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted Successfully", "success");
                }}
              ></i>
              <i
                className="fa-regular fa-pen-to-square mx-1 text-primary"
                style={{ cursor: "pointer" }}
                title="Edit Note"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>

          <p className="card-text text-muted flex-grow-1">{note.description}</p>

          {note.tag && (
            <span className="badge bg-secondary align-self-start">{note.tag}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
