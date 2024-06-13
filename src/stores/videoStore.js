import {create} from 'zustand';

export const useVideoStore = create(set => ({
  video: undefined,
  canPlaying: false,
  expandedVideo: false,
  setVideo: video => {
    if (this.canPlaying) {
      set({canPlaying: false});
    }
    set({video: video, expandedVideo: true});
    setTimeout(() => {
      set({canPlaying: true});
    }, 500);
  },
  setExpandedVideo: expandedVideo => set({expandedVideo}),
}));
