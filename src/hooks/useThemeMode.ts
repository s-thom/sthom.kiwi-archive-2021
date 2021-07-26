import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function getInitialValue(): boolean {
  if (typeof global.matchMedia === 'undefined') {
    return false;
  }

  return global.matchMedia('(prefers-color-scheme: dark)').matches;
}

export type ThemeMode = 'light' | 'dark';

export interface DarkModeContextValue {
  mode: ThemeMode;
  setMode: (newMode: ThemeMode | undefined) => void;
}

export const DarkModeContext = createContext<DarkModeContextValue>(null as any);

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) {
    throw new Error('useDarkMode must be called within a DarkModeProvider');
  }
}

export interface DarkModeProviderProps {
  /**
   * Important for ensuring pages generated using SSR match the initial render on the client
   */
  defaultMode: ThemeMode;
}

export function DarkModeProvider({ defaultMode }: DarkModeProviderProps) {
  const [currentState, setCurrentState] = useState<ThemeMode>(defaultMode);

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
}
