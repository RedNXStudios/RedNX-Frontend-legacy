import React from "react";
import Plyr, { Source } from "plyr";
import $ from "jquery";

import styles from "./Player.module.scss";

interface IProps {}

interface IState {
  videoElement?: HTMLVideoElement;
  player?: Plyr;
  sourceData: Source[];
}

class Player extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sourceData: [],
    };
  }

  componentDidMount() {
    const videoElement: HTMLVideoElement | null = document.querySelector(
      "video"
    );
    if (videoElement === null) return;
    const player = new Plyr(videoElement, {
      captions: { active: true, update: true },
    });
    const sourceData: Source[] = [];

    this.setState({
      videoElement,
      player,
      sourceData,
    });

    player.source = {
      // type: 'audio',
      type: "video",
      title: "Titulo",
      sources: this.state.sourceData,
    };

    player.on("qualitychange", (event) => {
      let plyr: Plyr | undefined = this.state.player;
      if (plyr === undefined) return;
      this.initPlayer(this.state.sourceData, plyr);
    });
    this.initPlayer(sourceData, player);
  }

  initPlayer(sourceData: Source[], player: Plyr) {
    /*$.each(sourceData, function () {
      const video = document.querySelector("video");
      $.each(sourceData, function () {
        // dash Adaptation
        if (
          this.mode === "mpd" &&
          this.size === player.config.quality.selected
        ) {
          // For more dash options, see https://github.com/Dash-Industry-Forum/dash.js
          const dash = dashjs.MediaPlayer().create();
          dash.updateSettings({
            debug: { logLevel: dashjs.Debug.LOG_LEVEL_NONE },
          });
          dash.initialize(video, this.src, true);
          // Expose player and dash so they can be used from the console
          window.player = player;
          window.dash = dash;
        }
      });
    });*/
  }

  render() {
    return (
      <div className={styles.playerWrapper}>
        <div className={styles.playerContainer}>
          <video
            controls
            crossOrigin="true"
            playsInline
            poster={`http://s3.tryhosting.com.br/video/thumbnail/test.webp`}
          />
        </div>
      </div>
    );
  }
}

export default Player;
