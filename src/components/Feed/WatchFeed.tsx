import React, { useEffect, useState } from "react";
import Net from "../../utils/Net";
import CompactVideoThumbnail from "../CompactVideoThumbnail";

import styles from "./Feed.module.scss";

function WatchFeed(props: any) {
  let [videos, setVideos] = useState<any[]>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  useEffect(() => {
    Net.get("/api/feed/new").then((e) => {
      setVideos(e.data.videos);
    });
  });

  return (
    <div className={styles.verticalFeed}>
      {videos.map((item, index) => (
        <CompactVideoThumbnail key={index} data={item} />
      ))}
    </div>
  );
}

export default WatchFeed;
