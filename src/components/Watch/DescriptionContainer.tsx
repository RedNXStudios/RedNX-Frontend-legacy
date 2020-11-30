import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { numberToText } from "../../utils/Conversion";
import UnduxStores from "../../undux/UnduxStores";

import styles from "./Watch.module.scss";
import Net from "../../utils/Net";

function DescriptionContainer(props: any) {
  const [showDescription, setShowDescription] = useState(false);
  let { auth, watch, channel } = UnduxStores.useStores();
  let { t } = useTranslation();

  function followChannel(e: any) {
    e.preventDefault();
    /*if (!this.props.auth.get("isLogged")) return;
    const { video, following } = this.state;
    if (video === undefined || video === null) return;
    if (following) {
      this.setState({
        following: false,
      });
      await net.post("/channel/follow", {
        id: video.channel.id,
        value: false,
      });
    } else {
      this.setState({
        following: true,
      });
      await net.post("/channel/follow", {
        id: video.channel.id,
        value: true,
      });
    }*/
  }

  function toggleDescription(e: React.MouseEvent) {
    e.preventDefault();
    if (showDescription) {
      setShowDescription(false);
    } else {
      setShowDescription(true);
    }
  }

  function likeVideo(e: React.MouseEvent, isLike: boolean | null) {
    e.preventDefault();
    if (!auth.get("isAuthenticated")) return;
    Net.post("/api/video/like", { id: watch.get("id"), isLike }).then(
      (e) => {
        if (e.data && e.data.error) {
          alert("Failed to like");
          return;
        }
        if (e.data && e.data.success) {
          if (isLike == null) {
            watch.set("liked")(false);
            watch.set("disliked")(false);
          } else if (isLike === true) {
            watch.set("liked")(true);
            watch.set("disliked")(false);
          } else {
            watch.set("liked")(false);
            watch.set("disliked")(true);
          }
        }
      }
    );
  }

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.channelInfoContainer}>
        <div className={styles.channelImage}>
          <Link
            className={styles.aaaaa}
            to={`/channel/${channel.get("link")}`}
          >
            <img
              src={`http://s3.tryhosting.com.br/channel/picture/${
                channel.get("picture") || "default"
              }`}
              alt="Channel avatar"
            />
          </Link>
          <div className={styles.channelNameContainer}>
            <div className={styles.channelName}>
              <Link to={`/channel/${channel.get("link")}`}>
                {channel.get("name")}
              </Link>
            </div>
            <div className={styles.channelFollowers}>
              {t("channel.follower", {
                countText: numberToText(channel.get("followers"), t),
              })}
            </div>
          </div>
        </div>
        <div className={styles.channelButtons}>
          <div className={`${styles.mobileBox} ${styles.topMobileBox}`}>
            <button
              type="button"
              className={`btn btn-sm ${
                watch.get("liked") ? "btn-danger" : ""
              }`}
              onClick={(e) =>
                likeVideo(e, watch.get("liked") ? null : true)
              }
            >
              <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
              &nbsp;&nbsp; {t("watch.like")}
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                watch.get("disliked") ? "btn-danger" : ""
              }`}
              onClick={(e) =>
                likeVideo(e, watch.get("disliked") ? null : false)
              }
            >
              <FontAwesomeIcon icon="thumbs-down" className={styles.icon} />
              &nbsp;&nbsp; {t("watch.dislike")}
            </button>
          </div>
          <div className={styles.mobileBox}>
            <button type="button" className="btn btn-sm">
              <FontAwesomeIcon icon="share" className={styles.icon} />
              &nbsp;&nbsp; {t("page.watch.share")}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              data-toggle="modal"
              data-target="#reportModal"
              title={t("shared.report")}
            >
              <FontAwesomeIcon icon="flag" className={styles.icon} />
            </button>
            <button
              type="button"
              className={`btn btn-sm ${
                channel.get("following")
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={followChannel}
            >
              <FontAwesomeIcon icon="heart" className={styles.icon} />
              &nbsp;&nbsp;{" "}
              {channel.get("following")
                ? t("channel.following")
                : t("channel.follow")}
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.card} card`}>
        <div
          className={`${styles.description} card-body ${
            showDescription ? styles.active : ""
          }`}
        >
          {channel.get("description")}
        </div>
        <button type="button" className={`btn`} onClick={toggleDescription}>
          <FontAwesomeIcon
            icon={showDescription ? "eye-slash" : "eye"}
            className={styles.icon}
          />
          &nbsp;&nbsp;{" "}
          {showDescription
            ? t("page.watch.hideDescription")
            : t("page.watch.showDescription")}
        </button>
      </div>
    </div>
  );
}

export default DescriptionContainer;
