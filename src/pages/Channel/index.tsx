/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect } from "react";
import ChannelFeed from "../../components/Feed/ChannelFeed";
import UnduxStores from "../../undux/UnduxStores";
import Net from "../../utils/Net";
import { numberToText } from "../../utils/Conversion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Channel.module.scss";

interface PathParamsType {
  link: string;
}
function Channel(props: any) {
  let { channel, feed, auth } = UnduxStores.useStores();
  let history = useHistory();
  let params: PathParamsType = useParams();
  let { t } = useTranslation();

  useEffect(() => {
    if (params.link !== channel.get("link")) {
      Net.post("/api/channels/get", { link: params.link })
        .then((e) => {
          if (e.data && e.data.error) {
            history.push("/");
            return;
          }
          if (e.data && e.data.channel) {
            channel.set("id")(e.data.channel.id);
            channel.set("guid")(e.data.channel.guid);
            channel.set("link")(e.data.channel.link);
            channel.set("name")(e.data.channel.name);
            channel.set("description")(e.data.channel.description);
            channel.set("picture")(e.data.channel.picture);
            channel.set("followers")(e.data.channel.followers);
            channel.set("following")(e.data.channel.following);
            getVideos();
          }
        })
        .catch((e) => {
          history.push("/");
        });
    } else getVideos();
  });

  function getVideos() {
    Net.post("/api/channel/video/get", { id: channel.get("id") })
      .then((e) => {
        if (e.data && e.data.error) {
          alert(e.data.error);
          return;
        }
        if (e.data && e.data.videos) {
          feed.set("channelFeed")(e.data.videos);
        }
      });
  }

  function followChannel() {
    if (auth.get("isAuthenticated")) {
      const isFollowing = !channel.get("following");
      Net.post("/api/channels/follow", {
        channelGuid: channel.get("guid"),
        isFollowing,
      })
        .then((e) => {
          if (e.data && e.data.error) {
            alert(e.data.error.message);
            return;
          }
          if (e.data && e.data.success) {
            channel.set("following")(isFollowing);
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
              src={`http://s3.tryhosting.com.br/channel/picture/${channel.get(
                "picture"
              )}`}
              alt="Channel"
            />
          </div>
          <div className={styles.channelInfo}>
            <span className={styles.name}>{channel.get("name")}</span>
            <span className={styles.followers}>
              {t("channel.follower", {
                count: channel.get("followers"),
                countText: numberToText(channel.get("followers"), t),
              })}
            </span>
          </div>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.channelButtons}>
            <button
              type="button"
              className={`btn mx-1 ${
                channel.get("following")
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={followChannel}
            >
              <FontAwesomeIcon
                icon={
                  channel.get("following")
                    ? ["fas", "heart"]
                    : ["far", "heart"]
                }
                className={styles.icon}
              />
              &nbsp;
              {channel.get("following")
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
              <ChannelFeed videos={feed.get("channelFeed")} />
            </div>
          </div>
          <div className="tab-pane fade show" id="about">
            {channel.get("description")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;
