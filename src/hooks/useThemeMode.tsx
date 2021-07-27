import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect, useLocalStorage, useMedia } from 'react-use';

const LS_ENABLED_KEY = 'preference.theme.enabled';
const LS_VALUE_KEY = 'preference.theme.value';

export type ThemeMode = 'light' | 'dark';

// #region Context
export interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (newMode: ThemeMode | undefined) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextValue>(null as any);

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be called within a ThemeModeProvider');
  }

  return ctx;
}
// #endregion

// #region Provider Component
export interface ThemeModeProviderProps {
  /**
   * Important for ensuring pages generated using SSR match the initial render on the client
   *
   * @default 'light'
   */
  defaultMode?: ThemeMode;
  /**
   * Forces the default mode on mount, to ensure classNames match when hydrating.
   * On mount, an effect runs that then allows the user/browser preference to be used.
   * This will, of course, potentially lead to a flash of the wrong theme for a frame.
   */
  ssrEnabled?: boolean;
}

export function ThemeModeProvider({
  defaultMode = 'light',
  ssrEnabled = false,
  children,
}: React.PropsWithChildren<ThemeModeProviderProps>) {
  const [forceDefault, setForceDefault] = useState<boolean>(ssrEnabled);
  const [storedMode, setStoredMode, removeStoredMode] = useLocalStorage<ThemeMode>(LS_VALUE_KEY, defaultMode);
  const [isControlled, setIsControlled] = useLocalStorage<boolean>(LS_ENABLED_KEY, false);

  const isDarkMode = useMedia('(prefers-color-scheme: dark)', defaultMode === 'dark');

  useIsomorphicLayoutEffect(() => {
    setForceDefault(false);
  }, []);

  const currentMode = useMemo<ThemeMode>(() => {
    if (forceDefault) {
      return defaultMode;
    }

    if (isControlled) {
      return storedMode ?? defaultMode;
    }

    return isDarkMode ? 'dark' : 'light';
  }, [defaultMode, forceDefault, isControlled, isDarkMode, storedMode]);
  const setMode = useCallback<(newMode: ThemeMode | undefined) => void>(
    (newMode) => {
      if (!newMode) {
        setIsControlled(false);
        removeStoredMode();
        return;
      }

      setIsControlled(true);
      setStoredMode(newMode);
    },
    [removeStoredMode, setIsControlled, setStoredMode],
  );

  const contextValue = useMemo<ThemeModeContextValue>(() => ({ mode: currentMode, setMode }), [currentMode, setMode]);

  return <ThemeModeContext.Provider value={contextValue}>{children}</ThemeModeContext.Provider>;
}
// #endregion
