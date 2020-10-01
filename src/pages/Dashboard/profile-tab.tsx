import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProfileStore from "../../undux/ProfileStore";

import styles from "./dasboard.module.scss";

function ProfileTab() {
  let profileStore = ProfileStore.useStore();
  return (
    <div className="tab-pane fade show active" id="profile">
      <a
        className={styles.profilePicture}
        data-toggle="modal"
        data-target="#uploadAvatarModal"
      >
        <div className={styles.overlay}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon="edit" size="lg" />
          </div>
        </div>
        <div className={styles.pictureContainer}>
          <img
            src={`https://storage.bhs.cloud.ovh.net/v1/AUTH_d86662c318654f248055a1f464721aa8/public/pp/${profileStore.get(
              "picture"
            )}.webp`}
            width="80"
            height="80"
            className="mx-auto d-inline-block align-top"
            alt="Profile"
          />
        </div>
      </a>
    </div>
  );
}

export default ProfileTab;
