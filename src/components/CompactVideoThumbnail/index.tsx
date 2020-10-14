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
    <div className={`${styles.compactVideoThumbnail} col-12`}>
      <div className={`${styles.content} row no-gutters`}>
        <div className="col-6">
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
                    <div className={styles.timeOverlay}>
                      {numberToTime(props.data.videoLength)}
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className={`${styles.videoInfo}`}>
            <div
              className={`${styles.videoFooter} ${
                props.data.thumb == null && styles.loadingAnimated
              }`}
            >
              <div className={styles.videoTitle}>
                {props.data.title && (
                  <Link to={`/watch/${props.data.guid}`}>
                    <h5 className={styles.linkLimit}>{props.data.title}</h5>
                  </Link>
                )}
              </div>
              {props.data.views && (
                <p>
                  {t("thumbnail.view", {
                    count: props.data.views,
                    countText: numberToText(props.data.views, t),
                  })}
                </p>
              )}
              {props.data.creationDate && (
                <p>
                  {t("time.ago", {
                    time: calculateVideoPostingTime(props.data.creationDate, t),
                  })}
                </p>
              )}
              {!props.data.channel && (
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
    </div>
  );
}

export default CompactVideoThumbnail;
