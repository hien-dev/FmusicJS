import {parseVideo} from 'networkings/responses/StreamResponse';
import {create} from 'zustand';

export const useVideoPlayer = create(set => ({
  video: undefined,
  expandedVideo: false,
  setVideo: video => {
    let pVideo = parseVideo(video);
    set({video: pVideo, expandedVideo: pVideo !== undefined ? true : false});
  },
  setExpandedVideo: expandedVideo => set({expandedVideo}),
  clearVideo: () => {
    set({video: undefined, expandedVideo: false});
  },
}));
