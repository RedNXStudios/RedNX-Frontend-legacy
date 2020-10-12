import React from "react";
import WatchStore from "../../undux/WatchStore";

import styles from "./Watch.module.scss";

function getClassification(classification: number | undefined | null) {
  if (
    classification === 0 ||
    classification === undefined ||
    classification === null
  )
    return "L";
  return classification;
}

function getClassificationColor(classification: number | undefined | null) {
  if (classification === undefined || classification === null) return "#0C9447";
  switch (classification) {
    case 10:
      return "#0F7DC2";
    case 12:
      return "#F8C411";
    case 14:
      return "#E67824";
    case 16:
      return "#DB2827";
    case 18:
      return "#1D1815";
    default:
      return "#0C9447";
  }
}

function TitleBar() {
  let watchStore = WatchStore.useStore();
  return (
    <div className={`${styles.videoTitleContainer}`}>
      <div className={`${styles.videoIcon}`}>
        {watchStore.get("icon") && (
          <img src={`http://s3.tryhosting.com.br/picture/channel/aa7f8b1894e94af8badab586e38d8e8e`} alt="Icon" />
        )}
      </div>
      <div
        className={`${styles.videoClassification}`}
        style={{
          backgroundColor: getClassificationColor(watchStore.get("classification")),
        }}
      >
        {getClassification(watchStore.get("classification"))}
      </div>
      <div className={`${styles.videoTitle}`}>
        <h5>{watchStore.get("title")}</h5>
      </div>
    </div>
  );
}

export default TitleBar;
