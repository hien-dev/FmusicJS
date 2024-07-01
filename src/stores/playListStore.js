import {create} from 'zustand';

export const usePlaylist = create(set => ({
  playlist: undefined,
  isAlbum: false,
  setPlaylist: ({playlist, isAlbum = false}) => {
    set({playlist: playlist, isAlbum: isAlbum});
  },
}));
