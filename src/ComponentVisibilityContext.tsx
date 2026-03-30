"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ComponentVisibilityContextType {
  isGlobalVisible: boolean;
  toggleVisibility: () => void;
  isVisible: (componentId: string) => boolean;
}

const ComponentVisibilityContext = createContext<
  ComponentVisibilityContextType | undefined
>(undefined);

const STORAGE_KEY = "componentVisibility";

export function ComponentVisibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isGlobalVisible, setIsGlobalVisible] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsGlobalVisible(JSON.parse(stored));
    }
  }, []);

  // Persist to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isGlobalVisible));
  }, [isGlobalVisible]);

  const toggleVisibility = () => {
    setIsGlobalVisible((prev) => !prev);
  };

  const isVisible = (componentId: string): boolean => {
    return isGlobalVisible;
  };

  return (
    <ComponentVisibilityContext.Provider
      value={{
        isGlobalVisible,
        toggleVisibility,
        isVisible,
      }}
    >
      {children}
    </ComponentVisibilityContext.Provider>
  );
}

export function useComponentVisibility() {
  const context = useContext(ComponentVisibilityContext);
  if (context === undefined) {
    throw new Error(
      "useComponentVisibility must be used within a ComponentVisibilityProvider"
    );
  }
  return context;
}
