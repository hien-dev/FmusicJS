import {navigationRef} from 'navigation/AppNavigator';
import {create} from 'zustand';

export const useNavigationStore = create(set => ({
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
