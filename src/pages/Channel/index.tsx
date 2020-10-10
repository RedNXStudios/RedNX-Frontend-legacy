/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from "react";
import VideoFeed from "../../components/Feed/Feed";
import ChannelStore, { StoreProps } from "../../undux/ChannelStore";
import Net from "../../utils/Net";
import { numberToText } from "../../utils/Conversion";
import { withRouter, RouteComponentProps } from "react-router";

import styles from "./Channel.module.scss";
import { withTranslation, WithTranslation } from "react-i18next";

interface PathParamsType {
  link: string;
}

interface IProps
  extends StoreProps,
    RouteComponentProps<PathParamsType>,
    WithTranslation {}

class Channel extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let storeLink = this.props.store.get("link");
    if (this.props.match.params.link !== storeLink) {
      Net.post("/api/channels/get", { link: this.props.match.params.link })
        .then((e) => {
          if (e.data && e.data.error) {
            this.props.history.push("/");
            return;
          }
          if (e.data && e.data.channel) {
            this.props.store.set("id")(e.data.channel.id);
            this.props.store.set("link")(e.data.channel.link);
            this.props.store.set("name")(e.data.channel.name);
            this.props.store.set("picture")(e.data.channel.picture);
            this.props.store.set("followers")(e.data.channel.followers);
          }
        })
        .catch((e) => {
          this.props.history.push("/");
        });
    }
  };

  render() {
    let { t } = this.props;
    return (
      <div className="page-content-np">
        <div className={styles.banner}></div>
        <div className={styles.channelBar}>
          <div className={styles.leftBox}>
            <div className={styles.channelPicture}>
              <img
                src={`http://s3.tryhosting.com.br/picture/channel/${this.props.store.get(
                  "picture"
                )}`}
                alt="Channel"
              />
            </div>
            <div className={styles.channelInfo}>
              <span className={styles.name}>
                {this.props.store.get("name")}
              </span>
              <span className={styles.followers}>
                {t("channel.follower", {
                  count: this.props.store.get("followers"),
                  countText: numberToText(this.props.store.get("followers"), t),
                })}
              </span>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.channelButtons}>
              <button type="button" className="btn btn-danger mx-1">
                Follow
              </button>
            </div>
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

export default ChannelStore.withStore(withRouter(withTranslation()(Channel)));
