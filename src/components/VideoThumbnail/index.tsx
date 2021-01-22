import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  numberToText,
  calculateVideoPostingTime,
  numberToTime,
} from "../../utils/Conversion";

import styles from "./VideoThumbnail.module.scss";
import UnduxStores from "../../undux/UnduxStores";
import Net from "../../utils/Net";

interface PropType {
  data?: any;
  channelVideo: boolean;
}

function VideoThumbnail(props: PropType) {
  let { t } = useTranslation();
  let { feed, watch, channel } = UnduxStores.useStores();
  let history = useHistory();

  function openVideo(guid: string) {
    Net.post("/api/video/get", { guid }).then((e) => {
      if (e.data && e.data.error) {
        console.error("Failed to get video " + guid);
        history.push("/");
        return;
      }
      if (e.data && e.data.video) {
        var videoData = watch.get("videoData");
        videoData.guid = e.data.video.guid;
        videoData.id = e.data.video.id;
        videoData.title = e.data.video.title;
        videoData.classification = e.data.video.classification;
        videoData.description = e.data.video.description;
        videoData.videoLength = e.data.video.videoLength;
        videoData.thumb = e.data.video.thumb;
        videoData.icon = e.data.video.icon;
        videoData.views = e.data.video.views;
        videoData.likes = e.data.video.likes;
        videoData.dislikes = e.data.video.dislikes;
        videoData.liked = e.data.video.liked;
        videoData.creationDate = e.data.video.creationDate;
        watch.set("videoData")(videoData);
        watch.set("comments")([]);
        if (e.data.video.channel) {
          channel.set("id")(e.data.video.channel.id);
          channel.set("guid")(e.data.video.channel.guid);
          channel.set("link")(e.data.video.channel.link);
          channel.set("name")(e.data.video.channel.name);
          channel.set("description")(e.data.video.channel.description);
          channel.set("picture")(e.data.video.channel.picture);
          channel.set("followers")(e.data.video.channel.followers);
          channel.set("following")(e.data.video.channel.following);
        }
        Net.get("/api/feed/new").then((e) => {
          feed.set("watchFeed")(e.data.videos);
        });
        Net.post("/api/comment/get", { videoId: e.data.video.id }).then((e) => {
          if(e.data) {
            watch.set("comments")(e.data);
          }
        });
        history.push("/watch/" + guid);
      }
    });
  }

  return (
    <div className={styles.videoThumbnail}>
      <div className={styles.content}>
        <div
          className={`${styles.thumbnail} ${
            props.data.thumb == null && styles.loadingAnimated
          }`}
        >
          {props.data.thumb != null && (
            <div
              className={styles.thumbnailContainer}
              onClick={() => openVideo(props.data.guid)}
            >
              <div className={styles.thumbnailContainer}>
                <img
                  src={`http://s3.tryhosting.com.br/video/thumbnail/${props.data.thumb}`}
                  alt="Video thumbnail"
                  className={styles.thumbnailImage}
                />
              </div>
              <div className={styles.thumbnailContainer}>
                <div className={styles.playIcon}>
                  <FontAwesomeIcon icon="play" size="lg" />
                </div>
                <div className={styles.overlay}>
                  <div className={styles.dataOverlay}>
                    <p>
                      {t("thumbnail.view", {
                        count: props.data.views,
                        countText: numberToText(props.data.views, t),
                      })}
                    </p>
                    <p>
                      {t("time.ago", {
                        time: calculateVideoPostingTime(
                          props.data.creationDate,
                          t
                        ),
                      })}
                    </p>
                  </div>
                  <div className={styles.timeOverlay}>
                    {numberToTime(props.data.videoLength)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.videoInfo}>
          {!props.channelVideo && (
            <div
              className={`${styles.channelImage} ${
                props.data.thumb == null && styles.loadingAnimated
              }`}
            >
              {props.data.channel && (
                <Link to={`/channel/${props.data.channel.link}`}>
                  <img
                    src={`http://s3.tryhosting.com.br/channel/picture/${props.data.channel.picture}`}
                    alt="Avatar do Canal"
                  />
                </Link>
              )}
            </div>
          )}
          <div
            className={`${styles.videoFooter} ${
              props.data.thumb == null && styles.loadingAnimated
            }`}
          >
            <div className={styles.videoTitle}>
              {props.data && (
                <div className={styles.videoTitleCursor} onClick={() => openVideo(props.data.guid)}>
                  <h5 className={styles.linkLimit}>{props.data.title}</h5>
                </div>
              )}
            </div>
            {!props.channelVideo && (
              <div className={styles.channelName}>
                {props.data.channel && (
                  <Link to={`/channel/${props.data.channel.link}`}>
                    <h5 className={styles.linkLimit}>
                      {props.data.channel.name}
                    </h5>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoThumbnail;
