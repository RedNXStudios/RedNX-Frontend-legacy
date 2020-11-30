/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useEffect } from "react";
import UnduxStores from "../../undux/UnduxStores";
import Net from "../../utils/Net";
import { useHistory, useParams } from "react-router-dom";

import styles from "./Watch.module.scss";
import Player from "../../components/Player";
import WatchFeed from "../../components/Feed/WatchFeed";
import TitleBar from "../../components/Watch/TitleBar";
import DescriptionContainer from "../../components/Watch/DescriptionContainer";
import CommentsContainer from "../../components/Watch/CommentsContainer";
interface PathParamsType {
  guid: string;
}

function Watch(props: any) {
  let { watch, channel, feed, sidebar } = UnduxStores.useStores();
  let history = useHistory();
  let params: PathParamsType = useParams();

  useEffect(() => {
    if (params.guid !== watch.get("guid")) {
      Net.post("/api/video/get", { guid: params.guid }).then((e) => {
        if (e.data && e.data.error) {
          alert("error1");
          history.push("/");
          return;
        }
        if (e.data && e.data.video) {
          watch.set("guid")(e.data.video.guid);
          watch.set("id")(e.data.video.id);
          watch.set("title")(e.data.video.title);
          watch.set("classification")(e.data.video.classification);
          watch.set("description")(e.data.video.description);
          watch.set("videoLength")(e.data.video.videoLength);
          watch.set("thumb")(e.data.video.thumb);
          watch.set("icon")(e.data.video.icon);
          watch.set("views")(e.data.video.views);
          watch.set("likes")(e.data.video.likes);
          watch.set("dislikes")(e.data.video.dislikes);
          watch.set("liked")(e.data.video.liked);
          watch.set("disliked")(e.data.video.disliked);
          watch.set("creationDate")(e.data.video.creationDate);
          watch.set("comments")([]);
          if (e.data.video.channel) {
            channel.set("id")(e.data.video.channel.id);
            channel.set("guid")(e.data.video.channel.guid);
            channel.set("link")(e.data.video.channel.link);
            channel.set("name")(e.data.video.channel.name);
            channel.set("description")(e.data.video.channel.description);
            channel.set("picture")(e.data.video.channel.picture);
            channel.set("followers")(e.data.video.channel.followers);
            channel.set("following")(e.data.video.channel.following);
          }
          Net.get("/api/feed/new").then((e) => {
            feed.set("watchFeed")(e.data.videos);
          });
          Net.post("/api/comment/get", { videoId: e.data.video.id }).then((e) => {
            if(e.data) {
              watch.set("comments")(e.data);
            }
          });
        }
      });
    }
  });

  /*function followChannel() {
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
  }*/

  return (
    <div
      className={`${styles.pageContent} ${
        !sidebar.get("show") && styles.removeMargin
      }`}
    >
      <div className={`${styles.container} row no-gutters`}>
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
          <Player />
          <TitleBar />
          <DescriptionContainer />
          <CommentsContainer />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-3">
          <WatchFeed videos={feed.get("watchFeed")} />
        </div>
      </div>
    </div>
  );
}

export default Watch;
