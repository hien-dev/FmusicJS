import {create} from 'zustand';

const useNetworking = create(set => ({
  requestHeader: undefined,
  setRequestHeader: value => {
    if (useNetworking.getState().requestHeader) {
      set({requestHeader: value});
    }
  },
  loading: false,
  setLoading: value => set({loading: value}),
}));

export default useNetworking;
