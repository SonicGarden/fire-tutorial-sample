import { createContext, useContext } from 'react';

export type ResponsiveLayoutContextValue = {
  navbar: {
    toggle: () => void;
  };
  main: {
    height: number;
  };
};

export const ResponsiveLayoutContext = createContext<ResponsiveLayoutContextValue>({
  navbar: { toggle: () => {} },
  main: { height: 0 },
});

export const ResponsiveLayoutContextProvider = ResponsiveLayoutContext.Provider;

export const useResponsiveLayoutContext = () => useContext(ResponsiveLayoutContext);
