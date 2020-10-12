import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  numberToText,
  calculateVideoPostingTime,
  numberToTime,
} from "../../utils/Conversion";

import styles from "./CompactVideoThumbnail.module.scss";

interface PropType {
  data?: any;
}

function CompactVideoThumbnail(props: PropType) {
  let { t } = useTranslation();

  return (
    <div className={`${styles.videoThumb} col-12`}></div>
    /*<div className={`${styles.videoThumb} col-12`}>
      <div className={`no-gutters row`}>
        <div className="col-6">
          <Link
            to={`/watch/${props.data?.guid}`}
            className={`${styles.videoLink}`}
          >
            <div className={`${styles.video}`}>
              {props.data && (
                <div className={styles.overlay}>
                  <div className={styles.playIcon}>
                    <FontAwesomeIcon icon="play" size="lg" />
                  </div>
                  <div className={styles.spaceConsumer}></div>
                  <div className={styles.videoData}>
                    <div
                      className={`${styles.infoOverlay} ${styles.playTime} float-right`}
                    >
                      {numberToTime(props.data.time)}
                    </div>
                  </div>
                </div>
              )}
              {props.data && (
                <img
                  src="/assets/thumb.jpg"
                  alt="Thumbnail do video"
                  className={styles.image}
                />
              )}
            </div>
          </Link>
        </div>
        <div className="col-6">
          {props.data.channel && (
            <div className={styles.videoInfo}>
              <Link
                className={styles.videoTitle}
                to={`/watch/${props.data?.guid}`}
              >
                {props.data.title}
              </Link>
              <div className={styles.channelName}>
                <Link to={`/channel/${props.data?.channel?.link}`}>
                  {props.data?.channel?.name}
                </Link>
              </div>
              <div className={styles.videoViews}>
                {t("components.thumbnail.view", {
                  count: props.data?.views,
                  countText: numberToText(props.data?.views, t),
                })}
              </div>
              <div className={styles.videoDate}>
                {t("time.ago", {
                  time: calculateVideoPostingTime(props.data?.creationDate, t),
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>*/
    /*<div className={styles.compactVideoThumbnail}>
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
          <div
            className={`${styles.channelImage} ${
              props.data.thumb == null && styles.loadingAnimated
            }`}
          >
            {props.data.channel && (
              <Link to={`/channel/${props.data.channel.link}`}>
                <img
                  src={`http://s3.tryhosting.com.br/picture/channel/${props.data.channel.picture}`}
                  alt="Avatar do Canal"
                />
              </Link>
            )}
          </div>

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

            <div className={styles.channelName}>
              {props.data.channel && (
                <Link to={`/channel/${props.data.channel.link}`}>
                  <h5 className={styles.linkLimit}>
                    {props.data.channel.name}
                  </h5>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>*/
  );
}

export default CompactVideoThumbnail;
