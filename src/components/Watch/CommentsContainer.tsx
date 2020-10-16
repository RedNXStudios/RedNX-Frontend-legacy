/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import TextareaAutosize from "react-autosize-textarea";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AuthStore from "../../undux/AuthStore";
import ProfileStore from "../../undux/ProfileStore";
import WatchStore from "../../undux/WatchStore";
import Net from "../../utils/Net";

import styles from "./Watch.module.scss";

function CommentsContainer(props: any) {
  const [tempComment, setTempComment] = useState<string>("");
  let profileStore = ProfileStore.useStore();
  let watchStore = WatchStore.useStore();
  let authStore = AuthStore.useStore();
  let { t } = useTranslation();

  function sendComment(e: any) {
    e.preventDefault();
    if (!authStore.get("isAuthenticated")) return;
    if (tempComment.length < 10) {
      alert(t("errors.commentTooSmall"));
      return;
    }
    if (tempComment.length > 500) {
      alert(t("errors.commentTooBig"));
      return;
    }
    Net.post("/api/comment/new", {
      videoId: watchStore.get("id"),
      message: tempComment,
    }).then((e) => {
      if (e.data && e.data.success) {
        var commentsArray = watchStore.get("comments");
        commentsArray.unshift({
          id: e.data.id,
          message: e.data.message,
          likes: 0,
          dislikes: 0,
          account: {
            displayUsername: profileStore.get("displayUsername"),
            picture: profileStore.get("picture"),
          },
          isLiked: null,
        });
        watchStore.set("comments")(commentsArray);
        setTempComment("");
      }
    });
  }

  /*async componentDidMount() {
    if (this.state.video === undefined || this.state.video === null) return;
    const { video } = this.state;
    const response = await net.post("/comment/get", {
      id: video.id,
    });
    if (response.data.success) {
      var commentsArray = this.state.comments;
      response.data.comments.forEach((comment: any) => {
        commentsArray.push(comment);
      });
      this.setState({
        comments: commentsArray,
      });
    } else {
      console.error("Failed to get comments!");
      console.error(response.data);
    }
  }*/

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.postComment}>
        {authStore.get("isAuthenticated") ? (
          <div className={`${styles.media} media`}>
            <img
              src={`http://s3.tryhosting.com.br/profile/picture/${profileStore.get(
                "picture"
              )}`}
              alt="Profile avatar"
            />
            <div className={`${styles.authComment} media-body`}>
              <TextareaAutosize
                className="form-control"
                placeholder={t("page.watch.commentPlaceHolder")}
                rows={1}
                onChange={(e: any) => {
                  if (e.target.value.length > 500) {
                    e.target.value = e.target.value.substring(0, 500);
                  }
                  setTempComment(e.target.value);
                }}
                value={tempComment}
              />
              <small>
                {t("page.watch.remainingCharacters", {
                  count: 500 - tempComment.length,
                })}
              </small>
              <button
                className={`${styles.sendBtn} btn btn-danger btn-sm`}
                disabled={tempComment.length < 10}
                onClick={sendComment}
              >
                {t("page.watch.sendComment")}
              </button>
            </div>
          </div>
        ) : (
          <h5 className={styles.notAuthenticated}>
            {t("page.watch.needLogin.youNeed")}{" "}
            <Link to="/login">{t("page.watch.needLogin.toLogin")}</Link>{" "}
            {t("page.watch.needLogin.toSend")}
          </h5>
        )}
      </div>
      <ul className="list-unstyled">
        {watchStore.get("comments").map((comment, index) => (
          <li className={`${styles.media} media`} key={index}>
            <img
              src={`http://s3.tryhosting.com.br/profile/picture/${
                comment.account.picture || "default"
              }`}
              alt="Profile avatar"
            />
            <div
              className={`media-body ${styles.comment}`}
              dangerouslySetInnerHTML={{
                __html: `<a className="mt-0 mb-1">${comment.account.displayUsername}</a>
                  ${comment.message}`,
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsContainer;
