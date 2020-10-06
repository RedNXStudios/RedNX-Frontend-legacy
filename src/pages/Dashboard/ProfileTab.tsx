/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ProfileStore from "../../undux/ProfileStore";

import styles from "./dasboard.module.scss";

function ProfileTab() {
  let profileStore = ProfileStore.useStore();
  return (
    <div className="tab-pane fade show active" id="profile">
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <a
              className={styles.profilePicture}
              data-toggle="modal"
              data-target="#uploadAvatarModal"
              href="#"
            >
              <div className={styles.overlay}>
                <div className={styles.icon}>
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-pencil-square"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.pictureContainer}>
                <img
                  src={`https://storage.bhs.cloud.ovh.net/v1/AUTH_d86662c318654f248055a1f464721aa8/public/pp/${profileStore.get(
                    "picture"
                  )}.webp`}
                  width="100"
                  height="100"
                  className="mx-auto d-inline-block align-top"
                  alt="Profile"
                />
              </div>
            </a>
          </div>
          <hr />
          <div className="form-group">
            <label>Display username</label>
            <input
              type="text"
              className="form-control"
              value={profileStore.get("displayUsername")}
              readOnly={true}
            />
          </div>
          <hr />
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={profileStore.get("username")}
              disabled
            />
          </div>
          <hr />
          <div className="text-center">
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;