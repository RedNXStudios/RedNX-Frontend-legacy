/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect } from "react";
import ChannelFeed from "../../components/Feed/ChannelFeed";
import ChannelStore from "../../undux/ChannelStore";
import AuthStore from "../../undux/AuthStore";
import Net from "../../utils/Net";
import { numberToText } from "../../utils/Conversion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Channel.module.scss";
import FeedStore from "../../undux/FeedStore";

interface PathParamsType {
  link: string;
}
function Channel(props: any) {
  let channelStore = ChannelStore.useStore();
  let feedStore = FeedStore.useStore();
  let authStore = AuthStore.useStore();
  let history = useHistory();
  let params: PathParamsType = useParams();
  let { t } = useTranslation();

  useEffect(() => {
    if (params.link !== channelStore.get("link")) {
      Net.post("/api/channels/get", { link: params.link })
        .then((e) => {
          if (e.data && e.data.error) {
            history.push("/");
            return;
          }
          if (e.data && e.data.channel) {
            channelStore.set("id")(e.data.channel.id);
            channelStore.set("guid")(e.data.channel.guid);
            channelStore.set("link")(e.data.channel.link);
            channelStore.set("name")(e.data.channel.name);
            channelStore.set("description")(e.data.channel.description);
            channelStore.set("picture")(e.data.channel.picture);
            channelStore.set("followers")(e.data.channel.followers);
            channelStore.set("following")(e.data.channel.following);
            getVideos();
          }
        })
        .catch((e) => {
          history.push("/");
        });
    } else getVideos();
  });

  function getVideos() {
    Net.post("/api/channel/video/get", { id: channelStore.get("id") })
      .then((e) => {
        if (e.data && e.data.error) {
          alert(e.data.error);
          return;
        }
        if (e.data && e.data.videos) {
          feedStore.set("channelFeed")(e.data.videos);
        }
      });
  }

  function followChannel() {
    if (authStore.get("isAuthenticated")) {
      const isFollowing = !channelStore.get("following");
      Net.post("/api/channels/follow", {
        channelGuid: channelStore.get("guid"),
        isFollowing,
      })
        .then((e) => {
          if (e.data && e.data.error) {
            alert(e.data.error.message);
            return;
          }
          if (e.data && e.data.success) {
            channelStore.set("following")(isFollowing);
          }
        })
        .catch((e) => {
          if (e.data && e.data.error) {
            alert(e.data.error.message);
            return;
          }
        });
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="page-content-np">
      <div className={styles.banner}></div>
      <div className={styles.channelBar}>
        <div className={styles.leftBox}>
          <div className={styles.channelPicture}>
            <img
              src={`http://s3.tryhosting.com.br/picture/channel/${channelStore.get(
                "picture"
              )}`}
              alt="Channel"
            />
          </div>
          <div className={styles.channelInfo}>
            <span className={styles.name}>{channelStore.get("name")}</span>
            <span className={styles.followers}>
              {t("channel.follower", {
                count: channelStore.get("followers"),
                countText: numberToText(channelStore.get("followers"), t),
              })}
            </span>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.channelButtons}>
            <button
              type="button"
              className={`btn mx-1 ${
                channelStore.get("following")
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={followChannel}
            >
              <FontAwesomeIcon
                icon={
                  channelStore.get("following")
                    ? ["fas", "heart"]
                    : ["far", "heart"]
                }
                className={styles.icon}
              />
              &nbsp;
              {channelStore.get("following")
                ? t("channel.following")
                : t("channel.follow")}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <nav className="nav dash-nav mb-2">
          <a
            className="dash-link active"
            data-toggle="tab"
            aria-controls="security"
            aria-selected="true"
            href="#videos"
          >
            Videos
          </a>
          <a
            className="dash-link"
            data-toggle="tab"
            aria-controls="privacy"
            aria-selected="false"
            href="#about"
          >
            About
          </a>
        </nav>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="videos">
            <div className="feed-list">
              <ChannelFeed videos={feedStore.get("channelFeed")} />
            </div>
          </div>
          <div className="tab-pane fade show" id="about">
            {channelStore.get("description")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;
