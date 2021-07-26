import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function getInitialValue(): boolean {
  if (typeof global.matchMedia === 'undefined') {
    return false;
  }

  return global.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function useDarkMode(defaultForSsr: boolean): {
  value: boolean;
  setValue: (newValue: boolean | undefined) => void;
} {
  const [currentState, setCurrentState] = useState<boolean>(defaultForSsr);

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function queryListener({ matches }: MediaQueryListEvent) {
      setCurrentState(matches);
    }
    setCurrentState(mediaQuery.matches);

    mediaQuery.addEventListener('change', queryListener);

    return () => {
      mediaQuery.removeEventListener('change', queryListener);
    };
  }, []);

  const setValue = useCallback((newValue: boolean | undefined) => {
    if (newValue === undefined) {
      setCurrentState(getInitialValue());
    } else {
      setCurrentState(newValue);
    }
  }, []);

  return useMemo(() => ({ value: currentState, setValue }), [currentState, setValue]);
}
