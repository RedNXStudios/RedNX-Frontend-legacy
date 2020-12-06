interface VideoDataModel {
  id: string;
  guid: string;
  title: string;
  classification: number;
  description: string;
  videoLength: number;
  thumb: string;
  icon: string;
  views: number;
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
  creationDate: string;
}

export default VideoDataModel;
