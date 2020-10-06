/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import VideoFeed from "../../components/Feed/Feed";

import styles from "./Channel.module.scss";

interface IProps {}

class Channel extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-content-np">
        <div className={styles.banner}></div>
        <div className={styles.channelBar}>
          <div className={styles.channelPicture}>
            <img
              src="http://s3.tryhosting.com.br/picture/profile/71cf5a3b40a946d284a20aaeac90a4a7"
              alt="Channel"
            />
          </div>
          <div className={styles.channelName}>
            <h4>Canal de teste</h4>
            <h5>5 milhoes de prostitutas</h5>
          </div>
        </div>
        <div className={styles.content}>
          <nav className="nav dash-nav mb-2">
            <a
              className="dash-link active"
              data-toggle="tab"
              aria-controls="profile"
              aria-selected="true"
              href="#profile"
            >
              Home
            </a>
            <a
              className="dash-link"
              data-toggle="tab"
              aria-controls="security"
              aria-selected="false"
              href="#security"
            >
              Videos
            </a>
            <a
              className="dash-link"
              data-toggle="tab"
              aria-controls="privacy"
              aria-selected="false"
              href="#privacy"
            >
              About
            </a>
          </nav>
          <div className="feed-list">
            <h5>Videos</h5>
            <VideoFeed videos={[{}, {}, {}, {}, {}, {}, {}, {}]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Channel;
