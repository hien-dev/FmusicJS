import {create} from 'zustand';
import useNetworking from 'hooks/useNetworking';
import {getVideoInfo} from 'networkings/api';
import {parseVideo} from 'networkings/responses/StreamResponse';

export const useVideoState = create(set => ({
  videoId: undefined,
  source: undefined,
  title: undefined,
  poster: undefined,
  author: '',
  relatedVideos: [],
  paused: true,
  expanded: false,
  repeat: false,
  setVideo: video => {
    if (video) {
      set({expanded: true});
      setTimeout(() => {
        set({
          videoId: video.videoId,
          source: video.source,
          title: video.title,
          relatedVideos: video.relatedVideos,
          poster: video.poster,
          author: video.author,
          paused: true,
        });
      }, 300);
    }
  },
  setExpanded: value => set({expanded: value}),
  setPaused: value => set({paused: value}),
  setRepeat: value => set({repeat: value}),
}));

const useVideoPlayer = ref => {
  const {setLoading} = useNetworking();
  const {setVideo} = useVideoState();

  const onResume = async () => {
    if (ref.current) {
      await ref.current.resume();
    }
  };

  const onPause = async () => {
    if (ref.current) {
      await ref.current.pause();
    }
  };

  const getVideo = async videoId => {
    setLoading(true);
    try {
      let video = await getVideoInfo(videoId);
      setVideo(parseVideo(video));
      setLoading(false);
    } catch (error) {
      console.log(`[error] videoinfo: ${JSON.stringify(error)}`);
      setLoading(false);
    }
  };

  return {getVideo, onResume, onPause};
};

export default useVideoPlayer;
