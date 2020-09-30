import React from "react";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";

import styles from "./Feed.module.scss";

interface IProps {
  videos: any[];
}

function VideoFeed(props: IProps) {
  return (
    <div className={styles.feed}>
      {props.videos.map((item, index) => (
        <VideoThumbnail key={index} data={item} />
      ))}
    </div>
  );
}

export default VideoFeed;
