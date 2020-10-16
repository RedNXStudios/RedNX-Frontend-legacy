import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  numberToText,
  calculateVideoPostingTime,
  numberToTime,
} from "../../utils/Conversion";

import styles from "./VideoThumbnail.module.scss";

interface PropType {
  data?: any;
  channelVideo: boolean;
}

function VideoThumbnail(props: PropType) {
  let { t } = useTranslation();

  return (
    <div className={styles.videoThumbnail}>
      <div className={styles.content}>
        <div
          className={`${styles.thumbnail} ${
            props.data.thumb == null && styles.loadingAnimated
          }`}
        >
          {props.data.thumb != null && (
            <Link
              className={styles.thumbnailContainer}
              to={`/watch/${props.data.guid}`}
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
            </Link>
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
                <Link to={`/watch/${props.data.guid}`}>
                  <h5 className={styles.linkLimit}>{props.data.title}</h5>
                </Link>
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
  /*return (
    <div
      className={`${styles.videoThumb} col-xs-12 col-sm-12 col-lg-6 col-xl-3`}
    >
      <Link to={`/watch/${props.data.guid}`} className={`${styles.videoLink}`}>
        <div className={`${styles.video}`}>
          <div className={styles.overlay}>
            <div className={styles.playIcon}>
              <FontAwesomeIcon icon="play" size="lg" />
            </div>
            <div className={styles.spaceConsumer}></div>
            <div className={styles.videoData}>
              <div className={`${styles.infoOverlay} float-left`}>
                <p>
                  {t("thumbnail.view", {
                    count: props.data.views,
                    countText: numberToText(props.data.views, t),
                  })}
                </p>
                <p>
                  {t("time.ago", {
                    time: calculateVideoPostingTime(props.data.creationDate, t),
                  })}
                </p>
              </div>
              <div
                className={`${styles.infoOverlay} ${styles.playTime} float-right`}
              >
                {numberToTime(props.data.videoLength)}
              </div>
            </div>
          </div>
          <img
            src={`http://s3.tryhosting.com.br/pp/${props.data.thumb}.webp`}
            width="1280"
            height="720"
            alt="Thumbnail do video"
            className={styles.image}
          />
        </div>
      </Link>
      <div className={styles.videoInfo}>
        <div className={styles.channelImage}>
          <Link to={`/channel/${props.data.channel.link}`}>
            <img
              src={`http://s3.tryhosting.com.br/pp/${props.data.channel.picture}.webp`}
              alt="Avatar do Canal"
            />
          </Link>
        </div>
        <div className={styles.videoFooter}>
          <p className={styles.videoTitle}>
            <Link to={`/watch/${props.data.guid}`}>{props.data.title}</Link>
          </p>
          <div className={styles.channelName}>
            <Link to={`/channel/${props.data.channel.link}`}>
              {props.data.channel.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );*/
}

export default VideoThumbnail;
