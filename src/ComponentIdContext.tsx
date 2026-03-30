"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ComponentIdContextType {
  isGlobalVisible: boolean;
  toggleVisibility: () => void;
  isVisible: (componentId: string) => boolean;
}

const ComponentIdContext = createContext<
  ComponentIdContextType | undefined
>(undefined);

const STORAGE_KEY = "componentVisibility";

export function ComponentIdProvider({
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
    <ComponentIdContext.Provider
      value={{
        isGlobalVisible,
        toggleVisibility,
        isVisible,
      }}
    >
      {children}
    </ComponentIdContext.Provider>
  );
}

export function useComponentId() {
  const context = useContext(ComponentIdContext);
  if (context === undefined) {
    throw new Error(
      "useComponentId must be used within a ComponentIdProvider"
    );
  }
  return context;
}
