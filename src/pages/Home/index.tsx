import React from "react";
import VideoFeed from "../../components/Feed/Feed";
import Net from "../../utils/Net";
import Loading from "../Loading/Loading";

interface PropsTypes {}

interface IState {
  loading: boolean;
  videos: any[];
}

class Home extends React.Component<PropsTypes, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      videos: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  }

  async componentDidMount() {
    Net.get("/api/feed/new").then((e) => {
      this.setState({
        loading: false,
        videos: e.data.videos,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="feed-list">
        <h5>Videos</h5>
        <hr />
        <VideoFeed videos={this.state.videos} />
      </div>
    );
  }
}

export default Home;
