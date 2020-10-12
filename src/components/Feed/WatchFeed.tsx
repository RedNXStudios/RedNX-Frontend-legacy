import React from "react";
import CompactVideoThumbnail from "../CompactVideoThumbnail";

import styles from "./Feed.module.scss";

interface IProps {
  videos: any[];
}

function WatchFeed(props: IProps) {
  return (
    <div className={styles.verticalFeed}>
      {props.videos.map((item, index) => (
        <CompactVideoThumbnail key={index} data={item}/>
      ))}
    </div>
  );
}

export default WatchFeed;