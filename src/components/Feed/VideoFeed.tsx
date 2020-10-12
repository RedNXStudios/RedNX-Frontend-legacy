import React from "react";
import VideoThumbnail from "../VideoThumbnail";

import styles from "./Feed.module.scss";

interface IProps {
  videos: any[];
}

function VideoFeed(props: IProps) {
  return (
    <div className={styles.horizontalFeed}>
      {props.videos.map((item, index) => (
        <VideoThumbnail key={index} data={item} channelVideo={false} />
      ))}
    </div>
  );
}

export default VideoFeed;
