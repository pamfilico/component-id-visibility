"use client";

import React, { useState, useEffect } from "react";
import { Chip, Snackbar, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useComponentId } from "./ComponentIdContext";

interface ComponentIdChipProps {
  componentId: string;
}

export default function ComponentIdChip({ componentId }: ComponentIdChipProps) {
  const { isVisible } = useComponentId();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render after client-side hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render if component is visible and mounted
  if (!mounted || !isVisible(componentId)) {
    return null;
  }

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(componentId);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy component ID:", err);
    }
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Chip
        label={componentId}
        icon={<ContentCopyIcon />}
        onClick={handleClick}
        clickable
        size="small"
        sx={{ cursor: "pointer" }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Component ID copied to clipboard: {componentId}
        </Alert>
      </Snackbar>
    </>
  );
}
