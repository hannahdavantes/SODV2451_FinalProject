import React from "react";

function DeleteCourseModal({
  isOpen,
  onClose,
  onDelete,
  courseName
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Delete Course</h2>

{/*Confirmation message showing the selected course name*/}
        <p>
          Are you sure you want to delete
          <strong> {courseName}</strong>?
        </p>

        <div className="modal-actions">

{/*Closes the modal without deleting the course*/}
          <button
            className="btn btn-secondary"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>

{/*Confirms deletion- call onDelete*/}
          <button
            className="btn btn-danger"
            onClick={onDelete}
            type="button"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteCourseModal;

