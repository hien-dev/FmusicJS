import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';

const useAppState = ({onForeground, onBackground}) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const appStateHandler = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateHandler?.remove();
    };
  }, []);

  const handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      isValidFunction(onForeground) && onForeground();
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      isValidFunction(onBackground) && onBackground();
    }

    appState.current = nextAppState;
  };

  const isValidFunction = func => {
    return func && typeof func === 'function';
  };

  return {
    appState: appState.current,
  };
};

export default useAppState;
