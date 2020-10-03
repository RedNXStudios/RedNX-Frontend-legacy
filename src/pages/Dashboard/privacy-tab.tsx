import React from "react";

function PrivacyTab() {
  return (
    <div className="tab-pane fade show" id="privacy">
      <div className="card">
        <div className="card-body">
          {/*<div className="custom-control custom-switch is-valid">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch1"
            />
            <label className="custom-control-label" htmlFor="customSwitch1">
              Toggle this switch element
            </label>
          </div>*/}
          <div className="text-center text-danger">
              No data found.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyTab;
