import {create} from 'zustand';

export const useVideoStore = create(set => ({
  video: undefined,
  expandedVideo: false,
  setVideo: video => {
    set({video: video, expandedVideo: video !== undefined ? true : false});
  },
  setExpandedVideo: expandedVideo => set({expandedVideo}),
}));
