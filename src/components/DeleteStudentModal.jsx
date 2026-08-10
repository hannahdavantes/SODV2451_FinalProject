import React from "react";

function DeleteStudentModal({
  isOpen,
  onClose,
  onDelete,
  studentName,
  errorMessage
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Delete Student</h2>

        <p>
          Are you sure you want to delete
          <strong> {studentName}</strong>?
        </p>

        {errorMessage && (
          <p style={{ color: "#dc2626" }} role="alert">
            {errorMessage}
          </p>
        )}

        <div className="modal-actions">

          <button
            className="btn btn-secondary"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>

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

export default DeleteStudentModal;
