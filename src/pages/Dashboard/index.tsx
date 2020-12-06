/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import UploadProfilePicture from "../../components/Modal/UploadProfilePictureModal";
import PrivacyTab from "./PrivacyTab";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";

function Dashboard() {
  return (
    <div className="page-content">
      <div className="container">
        <h3>Settings</h3>
        <nav className="nav dash-nav mb-2">
          <a
            className="dash-link active"
            data-toggle="tab"
            aria-controls="profile"
            aria-selected="true"
            href="#profile"
          >
            Profile
          </a>
          <a
            className="dash-link"
            data-toggle="tab"
            aria-controls="security"
            aria-selected="false"
            href="#security"
          >
            Security
          </a>
          <a
            className="dash-link"
            data-toggle="tab"
            aria-controls="privacy"
            aria-selected="false"
            href="#privacy"
          >
            Privacy
          </a>
        </nav>
        <div className="tab-content">
          <ProfileTab />
          <SecurityTab />
          <PrivacyTab />
        </div>
        <UploadProfilePicture />
      </div>
    </div>
  );
}

export default Dashboard;
