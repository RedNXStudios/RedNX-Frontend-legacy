import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { numberToText } from "../../utils/Conversion";
import AuthStore from "../../undux/AuthStore";
import WatchStore from "../../undux/WatchStore";

import styles from "./Watch.module.scss";
import ChannelStore from "../../undux/ChannelStore";

function DescriptionContainer(props: any) {
  const [showDescription, setShowDescription] = useState(false);
  let authStore = AuthStore.useStore();
  let watchStore = WatchStore.useStore();
  let channelStore = ChannelStore.useStore();
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

  function toggleDescription(e: any) {
    e.preventDefault();
    if (showDescription) {
      setShowDescription(false);
    } else {
      setShowDescription(true);
    }
  }

  function likeVideo(e: any) {
    e.preventDefault();
    /*if (!this.props.auth.get("isLogged")) return;
    const { video, like } = this.state;
    if (video === undefined || video === null) return;
    if (like) {
      this.setState({
        like: false,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: null,
      });
    } else {
      this.setState({
        like: true,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: true,
      });
    }*/
  }

  function dislikeVideo(e: any) {
    e.preventDefault();
    /*if (!this.props.auth.get("isLogged")) return;
    const { video, dislike } = this.state;
    if (video === undefined || video === null) return;
    if (dislike) {
      this.setState({
        like: false,
        dislike: false,
      });
      await net.post("/video/like", {
        id: video.id,
        value: null,
      });
    } else {
      this.setState({
        like: false,
        dislike: true,
      });
      await net.post("/video/like", {
        id: video.id,
        value: false,
      });
    }*/
  }

  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.channelInfoContainer}>
        <div className={styles.channelImage}>
          <Link
            className={styles.aaaaa}
            to={`/channel/${channelStore.get("link")}`}
          >
            <img
              src={`http://s3.tryhosting.com.br/picture/channel/${
                channelStore.get("picture") || "default"
              }`}
              alt="Channel avatar"
            />
          </Link>
          <div className={styles.channelNameContainer}>
            <div className={styles.channelName}>
              <Link to={`/channel/${channelStore.get("link")}`}>
                {channelStore.get("name")}
              </Link>
            </div>
            <div className={styles.channelFollowers}>
              {t("channel.follower", {
                countText: numberToText(channelStore.get("followers"), t),
              })}
            </div>
          </div>
        </div>
        <div className={styles.channelButtons}>
          <div className={`${styles.mobileBox} ${styles.topMobileBox}`}>
            <button
              type="button"
              className={`btn btn-sm ${true ? "btn-danger" : ""}`}
              onClick={likeVideo}
            >
              <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />
              &nbsp;&nbsp; {t("watch.like")}
            </button>
            <button
              type="button"
              className={`btn btn-sm ${false ? "btn-danger" : ""}`}
              onClick={dislikeVideo}
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
              className={`btn btn-sm btn-danger ${
                channelStore.get("following")
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={followChannel}
            >
              <FontAwesomeIcon icon="heart" className={styles.icon} />
              &nbsp;&nbsp;{" "}
              {channelStore.get("following")
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
          {watchStore.get("description")}
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
