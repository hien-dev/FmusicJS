import {create} from 'zustand';

export const useAppStore = create(set => ({
  loading: false,
  show: () => {
    set({loading: true});
  },
  hide: () => {
    set({loading: false});
  },
  paddingTop: undefined,
  setPaddingTop: value => {
    set({paddingTop: value});
  },
  repeat: false,
  setRepeat: value => {
    set({repeat: value});
  },
}));
