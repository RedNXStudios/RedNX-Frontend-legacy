import React from "react";
import UnduxStores from "../../undux/UnduxStores";

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
  let { watch } = UnduxStores.useStores();
  return (
    <div className={`${styles.videoTitleContainer}`}>
      <div className={`${styles.videoIcon}`}>
        {watch.get("videoData").icon && (
          <img src={`http://s3.tryhosting.com.br/video/icon/${watch.get("videoData").icon}`} alt="Icon" />
        )}
      </div>
      <div
        className={`${styles.videoClassification}`}
        style={{
          backgroundColor: getClassificationColor(watch.get("videoData").classification),
        }}
      >
        {getClassification(watch.get("videoData").classification)}
      </div>
      <div className={`${styles.videoTitle}`}>
        <h5>{watch.get("videoData").title}</h5>
      </div>
    </div>
  );
}

export default TitleBar;
