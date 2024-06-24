import {create} from 'zustand';

export const useLoading = create(set => ({
  loading: false,
  show: () => {
    set({loading: true});
  },
  hide: () => {
    set({loading: false});
  },
}));
