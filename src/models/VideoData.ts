import ChannelData from "./ChannelData";

interface VideoData {
    id: string;
    title: string;
    guid: string;
    views: number;
    creationDate: number;
    videoLength: number;
    thumb: string;
    icon: string;
    description: string;
    classification: number;
    channel: ChannelData;
}

export default VideoData;