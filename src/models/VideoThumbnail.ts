interface ChannelData {
    name: string;
    link: string;
    picture: string;
}

interface VideoThumbnailData {
    id: string;
    guid: string;
    channel: ChannelData;
    title: string;
    thumb: string;
    creationDate: string;
    videoLength: number;
    views: number;
}

export default VideoThumbnailData;