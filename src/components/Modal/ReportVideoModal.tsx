import React from "react";

function ReportVideoModal() {
  return (
    <div
      className="modal fade"
      id="reportVideoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="reportVideoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Report video</h5>
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

export default ReportVideoModal;
