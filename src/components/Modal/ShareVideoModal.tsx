import React from "react";

function ShareVideoModal() {
  return (
    <div
      className="modal fade"
      id="shareVideoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="shareVideoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share video</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={"https://ALO"}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareVideoModal;
