import Constants from 'utils/constants';
import {create} from 'zustand';

const useSafeArea = create(set => ({
  insets: undefined,
  setInsets: insets => {
    set({insets});
  },
  paddingTop: () => {
    if (useSafeArea.getState().insets) {
      return {
        paddingTop: Constants.android ? 0 : useSafeArea.getState().insets.top,
      };
    }
    return {};
  },
}));

export default useSafeArea;
