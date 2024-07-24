import {navigationRef} from 'navigation/AppNavigator';
import {create} from 'zustand';

const useNavigationState = create(set => ({
  current: undefined,
  navigate: (screen, params) => {
    navigationRef.navigate(screen, params);
    set({current: screen});
  },
  goBack: () => {
    navigationRef.goBack();
    set({current: undefined});
  },
}));

export default useNavigationState;
