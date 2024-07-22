import {create} from 'zustand';

const useAppScript = create(set => ({
  appScript: undefined,
  setAppScript: value => {
    if (useAppScript.getState().appScript === undefined) {
      set({appScript: value});
    }
  },
}));

export default useAppScript;
