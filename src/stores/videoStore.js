import {create} from 'zustand';
import {parseVideo} from 'networkings/responses/StreamResponse';
import {usePlaylist} from 'stores/playListStore';

export const useVideoPlayer = create(set => ({
  video: undefined,
  paused: true,
  expandedVideo: false,
  setVideo: video => {
    let pVideo = parseVideo(video);
    if (!video.isAlbum) {
      let setPlaylist = usePlaylist.getState().setPlaylist;
      setPlaylist({playlist: pVideo.relatedVideos});
    }
    set({video: pVideo, expandedVideo: pVideo !== undefined ? true : false});
  },
  setExpandedVideo: expandedVideo => set({expandedVideo}),
  setPaused: value => {
    set({paused: value});
  },
}));
