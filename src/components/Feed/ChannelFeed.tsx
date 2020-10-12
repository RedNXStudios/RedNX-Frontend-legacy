import React from "react";
import VideoThumbnail from "../VideoThumbnail";

import styles from "./Feed.module.scss";

interface IProps {
  videos: any[];
}

function ChannelFeed(props: IProps) {
  return (
    <div className={styles.horizontalFeed}>
      {props.videos.map((item, index) => (
        <VideoThumbnail key={index} data={item} channelVideo={true} />
      ))}
    </div>
  );
}

export default ChannelFeed;