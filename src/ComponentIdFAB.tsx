"use client";

import React, { useState, useEffect } from "react";
import { Fab, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useComponentId } from "./ComponentIdContext";

export default function ComponentIdFAB() {
  const { isGlobalVisible, toggleVisibility } = useComponentId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Tooltip
      title={isGlobalVisible ? "Hide components" : "Show components"}
      placement="left"
    >
      <Fab
        color="primary"
        aria-label="toggle component visibility"
        onClick={toggleVisibility}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 24,
          zIndex: 1001,
        }}
      >
        {isGlobalVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </Fab>
    </Tooltip>
  );
}
