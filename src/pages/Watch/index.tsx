/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect } from "react";
import WatchStore from "../../undux/WatchStore";
import ChannelStore from "../../undux/ChannelStore";
import FeedStore from "../../undux/FeedStore";
import AuthStore from "../../undux/AuthStore";
import Net from "../../utils/Net";
import { numberToText } from "../../utils/Conversion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Watch.module.scss";
import Player from "../../components/Player";
import WatchFeed from "../../components/Feed/WatchFeed";
import TitleBar from "../../components/Watch/TitleBar";
import DescriptionContainer from "../../components/Watch/DescriptionContainer";
import SideBarStore from "../../undux/SideBarStore";

interface PathParamsType {
  guid: string;
}
function Watch(props: any) {
  let watchStore = WatchStore.useStore();
  let channelStore = ChannelStore.useStore();
  let feedStore = FeedStore.useStore();
  let authStore = AuthStore.useStore();
  let sideBarStore = SideBarStore.useStore();
  let history = useHistory();
  let params: PathParamsType = useParams();
  let { t } = useTranslation();

  useEffect(() => {
    if (params.guid !== watchStore.get("guid")) {
      Net.post("/api/video/get", { guid: params.guid }).then((e) => {
        if (e.data && e.data.error) {
          alert("error1");
          history.push("/");
          return;
        }
        if (e.data && e.data.video) {
          watchStore.set("guid")(e.data.video.guid);
          watchStore.set("id")(e.data.video.id);
          watchStore.set("title")(e.data.video.title);
          watchStore.set("classification")(e.data.video.classification);
          watchStore.set("description")(e.data.video.description);
          watchStore.set("videoLength")(e.data.video.videoLength);
          watchStore.set("thumb")(e.data.video.thumb);
          watchStore.set("icon")(e.data.video.icon);
          watchStore.set("views")(e.data.video.views);
          watchStore.set("likes")(e.data.video.likes);
          watchStore.set("dislikes")(e.data.video.dislikes);
          watchStore.set("liked")(e.data.video.liked);
          watchStore.set("disliked")(e.data.video.disliked);
          watchStore.set("creationDate")(e.data.video.creationDate);
          if (e.data.video.channel) {
            channelStore.set("id")(e.data.video.channel.id);
            channelStore.set("guid")(e.data.video.channel.guid);
            channelStore.set("link")(e.data.video.channel.link);
            channelStore.set("name")(e.data.video.channel.name);
            channelStore.set("description")(e.data.video.channel.description);
            channelStore.set("picture")(e.data.video.channel.picture);
            channelStore.set("followers")(e.data.video.channel.followers);
            channelStore.set("following")(e.data.video.channel.following);
          }
        }
      });
    }
  });

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
    <div className={`${styles.pageContent} ${!sideBarStore.get("show") && styles.removeMargin}`}>
      <div className={`${styles.container} row no-gutters`}>
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
          <Player />
          <TitleBar />
          <DescriptionContainer />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-3">
          <WatchFeed />
        </div>
      </div>
    </div>
  );
}

export default Watch;
