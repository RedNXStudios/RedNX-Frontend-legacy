import React from "react";

function Dashboard() {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col mt-2">
          <div
            className="nav flex-column nav-pills"
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className="nav-link active"
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="true"
            >
              Profile
            </a>
            <a
              className="nav-link"
              id="v-pills-security-tab"
              data-toggle="pill"
              href="#v-pills-security"
              role="tab"
              aria-controls="v-pills-security"
              aria-selected="false"
            >
              Security
            </a>
            <a
              className="nav-link"
              id="v-pills-settings-tab"
              data-toggle="pill"
              href="#v-pills-settings"
              role="tab"
              aria-controls="v-pills-settings"
              aria-selected="false"
            >
              Settings
            </a>
          </div>
        </div>
        <div className="col-10 mt-2">
          <div className="tab-content" id="v-pills-tabContent"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
