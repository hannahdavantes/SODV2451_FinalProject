import React from "react";

function DeleteClassModal({
  isOpen,
  onClose,
  onDelete,
  classId
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Delete Class</h2> 
        <p>
          Are you sure you want to delete class id:
          <strong> {classId}</strong>?
        </p>

        <div className="modal-actions">

          <button
            className="btn btn-secondary"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>

{/*Confirms deletion and calls the delete function*/ }
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

export default DeleteClassModal;
