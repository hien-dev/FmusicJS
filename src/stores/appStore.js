import {create} from 'zustand';

export const useAppStore = create(set => ({
  paddingTop: undefined,
  loading: false,
  show: () => {
    set({loading: true});
  },
  hide: () => {
    set({loading: false});
  },
  setPaddingTop: value => {
    set({paddingTop: value});
  },
}));
