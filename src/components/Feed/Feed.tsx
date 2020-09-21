import React from "react";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail";

import styles from "./Feed.module.scss";

interface IProps {
  videos: any[];
}

function VideoFeed(props: IProps) {
  return (
    <div className={styles.feed}>
      {props.videos.map((item) => (
        <VideoThumbnail key={item.guid} data={item} />
      ))}
    </div>
  );
}

export default VideoFeed;
