import {parseVideo} from 'networkings/responses/StreamResponse';
import {create} from 'zustand';

export const useVideoPlayer = create(set => ({
  video: undefined,
  paused: true,
  expandedVideo: false,
  setVideo: video => {
    let pVideo = parseVideo(video);
    set({video: pVideo, expandedVideo: pVideo !== undefined ? true : false});
  },
  setExpandedVideo: expandedVideo => set({expandedVideo}),
  setPaused: value => {
    set({paused: value});
  },
}));
